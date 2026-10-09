import { Platform } from 'react-native';

import { getDatabase } from '@/db/index';

/**
 * Settings repository on top of the SQLite `settings` table.
 *
 * Web fallback: expo-sqlite on web (wasm) is still alpha and needs Metro
 * config + COOP/COEP headers, so on web we mirror the table with localStorage
 * to keep the same API and avoid breaking the bundle. Native always uses
 * SQLite.
 */

const WEB_STORAGE_PREFIX = 'simplestock:';

async function readFromNative(key: string): Promise<string | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ value: string }>(
    'SELECT value FROM settings WHERE key = ?',
    key
  );
  return row?.value ?? null;
}

async function writeToNative(key: string, value: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    key,
    value
  );
}

function readFromWeb(key: string): string | null {
  try {
    return globalThis.localStorage.getItem(`${WEB_STORAGE_PREFIX}${key}`);
  } catch {
    return null;
  }
}

function writeToWeb(key: string, value: string): void {
  try {
    globalThis.localStorage.setItem(`${WEB_STORAGE_PREFIX}${key}`, value);
  } catch {
    // storage unavailable (private mode, blocked) — ignore
  }
}

export function getSetting(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return Promise.resolve(readFromWeb(key));
  }
  return readFromNative(key);
}

export function setSetting(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    writeToWeb(key, value);
    return Promise.resolve();
  }
  return writeToNative(key, value);
}