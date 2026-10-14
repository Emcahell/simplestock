import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { getUserName, setUserName } from '@/db/user';

type UserContextValue = {
  name: string | null;
  ready: boolean;
  saveName: (name: string) => Promise<void>;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    void (async () => {
      const stored = await getUserName();
      if (!alive) return;
      setName(stored);
      setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const saveName = useCallback(async (next: string) => {
    const trimmed = next.trim();
    await setUserName(trimmed);
    setName(trimmed);
  }, []);

  const value = useMemo(
    () => ({ name, ready, saveName }),
    [name, ready, saveName]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}
