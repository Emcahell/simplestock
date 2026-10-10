import type { SQLiteDatabase } from 'expo-sqlite';

export type Migration = (db: SQLiteDatabase) => Promise<void>;

const DATABASE_VERSION = 2;

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