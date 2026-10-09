import { getDatabase } from '@/db/index';

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category_id: string | null;
  price: number;
  image_uri: string | null;
  stock: number;
  sku: string | null;
  created_at: string;
  updated_at: string;
};

export type ProductWithCategory = Product & {
  category_name: string | null;
};

function generateId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 8);
  const time = Date.now().toString(36);
  return `${prefix}_${time}${random}`;
}

export async function listCategories(): Promise<Category[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<{ id: string; name: string }>(
    'SELECT id, name FROM categories ORDER BY name COLLATE NOCASE ASC'
  );
  return rows;
}

export async function createCategory(name: string): Promise<Category> {
  const db = await getDatabase();
  const trimmed = name.trim();
  const id = generateId('cat');
  await db.runAsync('INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)', id, trimmed);
  const row = await db.getFirstAsync<{ id: string; name: string }>(
    'SELECT id, name FROM categories WHERE name = ? COLLATE NOCASE',
    trimmed
  );
  return row ?? { id, name: trimmed };
}

export async function listProducts(): Promise<ProductWithCategory[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<ProductWithCategory>(
    `SELECT p.*, c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     ORDER BY p.created_at DESC, p.id DESC`
  );
  return rows;
}

export async function getProductById(id: string): Promise<ProductWithCategory | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<ProductWithCategory>(
    `SELECT p.*, c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     WHERE p.id = ?`,
    id
  );
  return row ?? null;
}

export async function createProduct(input: {
  name: string;
  description: string;
  category_id: string | null;
  price: number;
  image_uri: string | null;
  sku: string | null;
}): Promise<Product> {
  const db = await getDatabase();
  const id = generateId('prod');
  const now = new Date().toISOString();
  await db.runAsync(
    `INSERT INTO products (id, name, description, category_id, price, image_uri, stock, sku, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, ?)`,
    id,
    input.name.trim(),
    input.description.trim(),
    input.category_id,
    input.price,
    input.image_uri,
    input.sku?.trim() || null,
    now,
    now
  );
  const row = await db.getFirstAsync<Product>('SELECT * FROM products WHERE id = ?', id);
  if (!row) throw new Error('Failed to create product');
  return row;
}

export async function updateProduct(id: string, input: {
  name: string;
  description: string;
  category_id: string | null;
  price: number;
  image_uri: string | null;
  sku: string | null;
}): Promise<void> {
  const db = await getDatabase();
  const now = new Date().toISOString();
  await db.runAsync(
    `UPDATE products SET name=?, description=?, category_id=?, price=?, image_uri=?, sku=?, updated_at=?
     WHERE id = ?`,
    input.name.trim(),
    input.description.trim(),
    input.category_id,
    input.price,
    input.image_uri,
    input.sku?.trim() || null,
    now,
    id
  );
}

export async function deleteProduct(id: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM products WHERE id = ?', id);
}