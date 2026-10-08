import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'simplestock.db';

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

/**
 * Singleton handle to the app SQLite database. This is the future home of all
 * persisted data (products, sales, restocks); for now it only stores app
 * settings.
 */
export function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }
  return databasePromise;
}