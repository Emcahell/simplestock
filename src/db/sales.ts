import type { SQLiteDatabase } from 'expo-sqlite';

import { getDatabase } from '@/db/index';

export type Sale = {
  id: string;
  code: string;
  total: number;
  created_at: string;
};

export type SaleItem = {
  id: string;
  sale_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
};

export type SaleItemWithProduct = SaleItem & {
  product_name: string;
  sku: string | null;
  image_uri: string | null;
  stock: number;
};

export type SaleWithItems = Sale & {
  items: SaleItemWithProduct[];
};

export type SaleInputItem = {
  product_id: string;
  quantity: number;
  unit_price: number;
};

function generateId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 8);
  const time = Date.now().toString(36);
  return `${prefix}_${time}${random}`;
}

type Db = SQLiteDatabase;

async function nextSaleCode(db: Db): Promise<string> {
  const row = await db.getFirstAsync<{ n: number }>(
    "SELECT COALESCE(MAX(CAST(substr(code, 5) AS INTEGER)), 0) AS n FROM sales"
  );
  const next = (row?.n ?? 0) + 1;
  return `VEN-${String(next).padStart(4, '0')}`;
}

async function applyStockDelta(db: Db, productId: string, delta: number): Promise<void> {
  await db.runAsync(
    'UPDATE products SET stock = MAX(0, stock + ?), updated_at = ? WHERE id = ?',
    delta,
    new Date().toISOString(),
    productId
  );
}

function computeTotal(items: SaleInputItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
}

async function loadItems(db: Db, saleIds: string[]): Promise<Map<string, SaleItemWithProduct[]>> {
  const grouped = new Map<string, SaleItemWithProduct[]>();
  if (saleIds.length === 0) return grouped;
  const placeholders = saleIds.map(() => '?').join(', ');
  const rows = await db.getAllAsync<SaleItemWithProduct>(
    `SELECT si.*, p.name AS product_name, p.sku AS sku, p.image_uri AS image_uri, p.stock AS stock
     FROM sale_items si
     JOIN products p ON p.id = si.product_id
     WHERE si.sale_id IN (${placeholders})
     ORDER BY si.rowid ASC`,
    ...saleIds
  );
  for (const row of rows) {
    const list = grouped.get(row.sale_id);
    if (list) {
      list.push(row);
    } else {
      grouped.set(row.sale_id, [row]);
    }
  }
  return grouped;
}

export async function listSales(): Promise<SaleWithItems[]> {
  const db = await getDatabase();
  const sales = await db.getAllAsync<Sale>(
    'SELECT * FROM sales ORDER BY created_at DESC, id DESC'
  );
  const itemsBySale = await loadItems(db, sales.map((sale) => sale.id));
  return sales.map((sale) => ({ ...sale, items: itemsBySale.get(sale.id) ?? [] }));
}

export async function getSaleById(id: string): Promise<SaleWithItems | null> {
  const db = await getDatabase();
  const sale = await db.getFirstAsync<Sale>('SELECT * FROM sales WHERE id = ?', id);
  if (!sale) return null;
  const itemsBySale = await loadItems(db, [sale.id]);
  return { ...sale, items: itemsBySale.get(sale.id) ?? [] };
}

export async function createSale(items: SaleInputItem[]): Promise<Sale> {
  const db = await getDatabase();
  const id = generateId('ven');
  const now = new Date().toISOString();
  const total = computeTotal(items);

  await db.runAsync('BEGIN TRANSACTION');
  try {
    const code = await nextSaleCode(db);
    await db.runAsync(
      'INSERT INTO sales (id, code, total, created_at) VALUES (?, ?, ?, ?)',
      id,
      code,
      total,
      now
    );
    for (const item of items) {
      await db.runAsync(
        'INSERT INTO sale_items (id, sale_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?, ?)',
        generateId('item'),
        id,
        item.product_id,
        item.quantity,
        item.unit_price
      );
      await applyStockDelta(db, item.product_id, -item.quantity);
    }
    await db.runAsync('COMMIT');
  } catch (error) {
    await db.runAsync('ROLLBACK');
    throw error;
  }

  const row = await db.getFirstAsync<Sale>('SELECT * FROM sales WHERE id = ?', id);
  if (!row) throw new Error('Failed to create sale');
  return row;
}

export async function updateSale(id: string, items: SaleInputItem[]): Promise<void> {
  const db = await getDatabase();
  const total = computeTotal(items);

  await db.runAsync('BEGIN TRANSACTION');
  try {
    const existing = await db.getFirstAsync<Sale>('SELECT * FROM sales WHERE id = ?', id);
    if (!existing) {
      await db.runAsync('ROLLBACK');
      throw new Error('Sale not found');
    }

    const oldItems = await db.getAllAsync<SaleItem>(
      'SELECT * FROM sale_items WHERE sale_id = ?',
      id
    );
    for (const item of oldItems) {
      await applyStockDelta(db, item.product_id, item.quantity);
    }
    await db.runAsync('DELETE FROM sale_items WHERE sale_id = ?', id);

    for (const item of items) {
      await db.runAsync(
        'INSERT INTO sale_items (id, sale_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?, ?)',
        generateId('item'),
        id,
        item.product_id,
        item.quantity,
        item.unit_price
      );
      await applyStockDelta(db, item.product_id, -item.quantity);
    }

    await db.runAsync('UPDATE sales SET total = ? WHERE id = ?', total, id);
    await db.runAsync('COMMIT');
  } catch (error) {
    await db.runAsync('ROLLBACK');
    throw error;
  }
}

export async function deleteSale(id: string): Promise<void> {
  const db = await getDatabase();

  await db.runAsync('BEGIN TRANSACTION');
  try {
    const oldItems = await db.getAllAsync<SaleItem>(
      'SELECT * FROM sale_items WHERE sale_id = ?',
      id
    );
    for (const item of oldItems) {
      await applyStockDelta(db, item.product_id, item.quantity);
    }
    await db.runAsync('DELETE FROM sale_items WHERE sale_id = ?', id);
    await db.runAsync('DELETE FROM sales WHERE id = ?', id);
    await db.runAsync('COMMIT');
  } catch (error) {
    await db.runAsync('ROLLBACK');
    throw error;
  }
}