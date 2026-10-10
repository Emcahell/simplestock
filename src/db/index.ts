import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

import { migrate } from '@/db/migrate';

const DATABASE_NAME = 'simplestock.db';

type DatabaseHandle = Promise<SQLiteDatabase>;

const globalForDb = globalThis as typeof globalThis & {
  __simplestockDatabase?: DatabaseHandle;
};

/**
 * Singleton handle to the app SQLite database (products, sales, restocks and
 * app settings). The handle is cached on `globalThis` so it survives Fast
 * Refresh / module re-evaluation: re-opening the same file on every reload
 * leads expo-sqlite to release native statements ("shared object already
 * released") while in-flight queries are still using them. Migrations run once
 * at open.
 */
export function getDatabase(): DatabaseHandle {
  if (!globalForDb.__simplestockDatabase) {
    globalForDb.__simplestockDatabase = (async () => {
      const db = await openDatabaseAsync(DATABASE_NAME);
      await migrate(db);
      return db;
    })();
  }
  return globalForDb.__simplestockDatabase;
}