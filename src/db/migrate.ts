import type { SQLiteDatabase } from 'expo-sqlite';

export type Migration = (db: SQLiteDatabase) => Promise<void>;

const DATABASE_VERSION = 5;

const MIGRATIONS: Record<number, Migration> = {
  // v1: app settings (key/value). Future versions add products, sales, etc.
  1: async (db) => {
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);
`);
  },
  2: async (db) => {
    await db.execAsync(`
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL UNIQUE COLLATE NOCASE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category_id TEXT,
  price REAL NOT NULL,
  image_uri TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  sku TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name COLLATE NOCASE);
`);
  },
  // v3: restocks (surtidos) — cada ingreso suma unidades al stock del producto
  // y guarda el stock resultante tras el ingreso.
  3: async (db) => {
    await db.execAsync(`
CREATE TABLE IF NOT EXISTS restocks (
  id TEXT PRIMARY KEY NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  stock_after INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_restocks_product_id ON restocks(product_id);
CREATE INDEX IF NOT EXISTS idx_restocks_created_at ON restocks(created_at);
`);
  },
  // v4: sales + sale_items — cada venta guarda sus líneas con cantidad y precio
  // unitario, y descuenta esas unidades del stock del producto.
  4: async (db) => {
    await db.execAsync(`
CREATE TABLE IF NOT EXISTS sales (
  id TEXT PRIMARY KEY NOT NULL,
  code TEXT NOT NULL,
  total REAL NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS sale_items (
  id TEXT PRIMARY KEY NOT NULL,
  sale_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_sales_created_at ON sales(created_at);
CREATE INDEX IF NOT EXISTS idx_sale_items_sale_id ON sale_items(sale_id);
CREATE INDEX IF NOT EXISTS idx_sale_items_product_id ON sale_items(product_id);
`);
  },
  // v5: activities — bitácora de lo que va ocurriendo (productos, ventas,
  // surtidos y sus ediciones) para las pantallas de Inicio y Registros.
  5: async (db) => {
    await db.execAsync(`
CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  value TEXT NOT NULL DEFAULT '',
  entity_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at);
`);
  },
};

/**
 * Applies every pending migration and tracks the schema version in
 * `PRAGMA user_version`. Safe to call at every launch.
 */
export async function migrate(db: SQLiteDatabase): Promise<void> {
  const result = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  const current = result?.user_version ?? 0;

  for (let version = current + 1; version <= DATABASE_VERSION; version += 1) {
    const migration = MIGRATIONS[version];
    if (migration) {
      await migration(db);
    }
    await db.execAsync(`PRAGMA user_version = ${version}`);
  }
}

export function getRequiredMigrationVersion(): number {
  return DATABASE_VERSION;
}