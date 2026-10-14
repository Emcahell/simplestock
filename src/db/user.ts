import { getSetting, setSetting } from '@/db/settings';

const USER_NAME_KEY = 'user_name';

/** Nombre del usuario guardado en settings (null si aún no se registró). */
export async function getUserName(): Promise<string | null> {
  const value = await getSetting(USER_NAME_KEY);
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function setUserName(name: string): Promise<void> {
  return setSetting(USER_NAME_KEY, name.trim());
}
