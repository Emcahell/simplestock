import type { SQLiteDatabase } from 'expo-sqlite';

import { getDatabase } from '@/db/index';

export type ActivityType =
  | 'product_created'
  | 'product_updated'
  | 'sale_created'
  | 'sale_updated'
  | 'restock_created'
  | 'restock_updated';

export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  subtitle: string;
  value: string;
  entity_id: string | null;
  created_at: string;
};

export type LogActivityInput = {
  type: ActivityType;
  title: string;
  subtitle?: string;
  value?: string;
  entity_id?: string | null;
  created_at?: string;
};

function generateId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 8);
  const time = Date.now().toString(36);
  return `${prefix}_${time}${random}`;
}

/**
 * Inserta una entrada en la bitácora. Recibe el handle de la base para poder
 * escribir dentro de la misma transacción que la operación que la origina.
 */
export async function logActivity(
  db: SQLiteDatabase,
  input: LogActivityInput
): Promise<void> {
  await db.runAsync(
    `INSERT INTO activities (id, type, title, subtitle, value, entity_id, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    generateId('act'),
    input.type,
    input.title,
    input.subtitle ?? '',
    input.value ?? '',
    input.entity_id ?? null,
    input.created_at ?? new Date().toISOString()
  );
}

export async function listActivities(limit?: number): Promise<Activity[]> {
  const db = await getDatabase();
  const base = 'SELECT * FROM activities ORDER BY created_at DESC, rowid DESC';
  if (typeof limit === 'number') {
    return db.getAllAsync<Activity>(`${base} LIMIT ?`, limit);
  }
  return db.getAllAsync<Activity>(base);
}
