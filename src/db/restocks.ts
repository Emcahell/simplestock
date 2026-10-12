import { getDatabase } from '@/db/index';

export type Restock = {
  id: string;
  product_id: string;
  quantity: number;
  description: string;
  stock_after: number;
  created_at: string;
};

export type RestockWithProduct = Restock & {
  product_name: string;
  image_uri: string | null;
  sku: string | null;
};

function generateId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 8);
  const time = Date.now().toString(36);
  return `${prefix}_${time}${random}`;
}

export async function listRestocks(): Promise<RestockWithProduct[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<RestockWithProduct>(
    `SELECT r.*, p.name AS product_name, p.image_uri AS image_uri, p.sku AS sku
     FROM restocks r
     JOIN products p ON p.id = r.product_id
     ORDER BY r.created_at DESC, r.id DESC`
  );
  return rows;
}

export async function getRestockById(id: string): Promise<RestockWithProduct | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<RestockWithProduct>(
    `SELECT r.*, p.name AS product_name, p.image_uri AS image_uri, p.sku AS sku
     FROM restocks r
     JOIN products p ON p.id = r.product_id
     WHERE r.id = ?`,
    id
  );
  return row ?? null;
}

async function getProductStock(db: Awaited<ReturnType<typeof getDatabase>>, productId: string): Promise<number> {
  const row = await db.getFirstAsync<{ stock: number }>(
    'SELECT stock FROM products WHERE id = ?',
    productId
  );
  return row?.stock ?? 0;
}

export async function createRestock(input: {
  product_id: string;
  quantity: number;
  description: string;
}): Promise<Restock> {
  const db = await getDatabase();
  const id = generateId('sur');
  const now = new Date().toISOString();

  await db.runAsync('BEGIN TRANSACTION');
  try {
    const current = await getProductStock(db, input.product_id);
    const stockAfter = current + input.quantity;
    await db.runAsync(
      `INSERT INTO restocks (id, product_id, quantity, description, stock_after, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      id,
      input.product_id,
      input.quantity,
      input.description.trim(),
      stockAfter,
      now
    );
    await db.runAsync(
      'UPDATE products SET stock = ?, updated_at = ? WHERE id = ?',
      stockAfter,
      now,
      input.product_id
    );
    await db.runAsync('COMMIT');
  } catch (error) {
    await db.runAsync('ROLLBACK');
    throw error;
  }

  const row = await db.getFirstAsync<Restock>('SELECT * FROM restocks WHERE id = ?', id);
  if (!row) throw new Error('Failed to create restock');
  return row;
}

export async function updateRestock(
  id: string,
  input: { quantity: number; description: string }
): Promise<void> {
  const db = await getDatabase();

  await db.runAsync('BEGIN TRANSACTION');
  try {
    const existing = await db.getFirstAsync<Restock>(
      'SELECT * FROM restocks WHERE id = ?',
      id
    );
    if (!existing) {
      await db.runAsync('ROLLBACK');
      throw new Error('Restock not found');
    }

    const delta = input.quantity - existing.quantity;
    const stockAfter = existing.stock_after + delta;
    await db.runAsync(
      'UPDATE products SET stock = ?, updated_at = ? WHERE id = ?',
      stockAfter,
      new Date().toISOString(),
      existing.product_id
    );
    await db.runAsync(
      'UPDATE restocks SET quantity = ?, description = ?, stock_after = ? WHERE id = ?',
      input.quantity,
      input.description.trim(),
      stockAfter,
      id
    );
    await db.runAsync('COMMIT');
  } catch (error) {
    await db.runAsync('ROLLBACK');
    throw error;
  }
}

export async function deleteRestock(id: string): Promise<void> {
  const db = await getDatabase();

  await db.runAsync('BEGIN TRANSACTION');
  try {
    const existing = await db.getFirstAsync<Restock>(
      'SELECT * FROM restocks WHERE id = ?',
      id
    );
    if (!existing) {
      await db.runAsync('ROLLBACK');
      return;
    }

    await db.runAsync(
      'UPDATE products SET stock = MAX(0, stock - ?), updated_at = ? WHERE id = ?',
      existing.quantity,
      new Date().toISOString(),
      existing.product_id
    );
    await db.runAsync('DELETE FROM restocks WHERE id = ?', id);
    await db.runAsync('COMMIT');
  } catch (error) {
    await db.runAsync('ROLLBACK');
    throw error;
  }
}