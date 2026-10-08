import { vars } from 'nativewind';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme, View } from 'react-native';

import { getSetting, setSetting } from '@/db/settings';
import { palettes, paletteToVars, type ThemeColors, type ThemeName } from '@/theme/palettes';

const SETTINGS_KEY = 'theme_mode';

type ThemeContextValue = {
  /** 'system' until the user picks a side explicitly. */
  mode: ThemeName | 'system';
  /** Effective theme after resolving 'system' against the device scheme. */
  resolved: ThemeName;
  /** Paletted tokens for the resolved theme (also used by phosphor icons). */
  colors: ThemeColors;
  /** False until the persisted setting is read (gate the UI to avoid flashes). */
  hydrated: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeName | 'system'>('system');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let alive = true;
    getSetting(SETTINGS_KEY)
      .then((stored) => {
        if (alive && (stored === 'light' || stored === 'dark')) {
          setMode(stored);
        }
      })
      .finally(() => {
        if (alive) {
          setHydrated(true);
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  const resolved: ThemeName =
    mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode;

  const toggleTheme = useCallback(() => {
    setMode((current) => {
      const next: ThemeName = current === 'dark' ? 'light' : 'dark';
      void setSetting(SETTINGS_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ mode, resolved, colors: palettes[resolved], hydrated, toggleTheme }),
    [mode, resolved, hydrated, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <View className="flex-1 bg-background" style={vars(paletteToVars(palettes[resolved]))}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useThemePreference(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemePreference debe usarse dentro de <ThemeProvider>');
  }
  return context;
}