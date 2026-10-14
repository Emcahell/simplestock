import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

import { getRequiredMigrationVersion, migrate } from '@/db/migrate';

const DATABASE_NAME = 'simplestock.db';

type DatabaseCache = {
  promise: Promise<SQLiteDatabase>;
  version: number;
};

const globalForDb = globalThis as typeof globalThis & {
  __simplestockDatabase?: DatabaseCache;
};

/**
 * Singleton handle to the app SQLite database (products, sales, restocks,
 * activities and app settings). The handle is cached on `globalThis` so it
 * survives Fast Refresh / module re-evaluation: re-opening the same file on
 * every reload leads expo-sqlite to release native statements ("shared object
 * already released") while in-flight queries are still using them.
 *
 * Migrations run once at open. If the required schema version changes while the
 * app is still running (a Fast Refresh after bumping `DATABASE_VERSION`), the
 * cached handle is reused but migrations run again so the schema stays current.
 */
export function getDatabase(): Promise<SQLiteDatabase> {
  const target = getRequiredMigrationVersion();
  const cached = globalForDb.__simplestockDatabase;

  if (cached && cached.version === target) {
    return cached.promise;
  }

  const promise = (async () => {
    if (cached) {
      const db = await cached.promise;
      await migrate(db);
      return db;
    }
    const db = await openDatabaseAsync(DATABASE_NAME);
    await migrate(db);
    return db;
  })();

  globalForDb.__simplestockDatabase = { promise, version: target };
  return promise;
}
