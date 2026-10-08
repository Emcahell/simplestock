import '../global.css';

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];
  const navigationTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider
      value={{
        ...navigationTheme,
        colors: {
          ...navigationTheme.colors,
          primary: colors.primary,
          background: colors.background,
          card: colors.backgroundElement,
          text: colors.text,
          border: colors.border,
          notification: colors.primary,
        },
      }}
    >
      <AnimatedSplashOverlay />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="registros"
          options={{
            title: 'Registros de actividades',
            headerBackTitle: 'Volver',
            // Las pantallas llevan `bg-surface` (siempre oscuro, ver DESIGN.md),
            // así que el header nativo se fija en la paleta dark: con el esquema
            // del sistema en claro quedaría una barra blanca sobre fondo negro.
            headerStyle: { backgroundColor: Colors.dark.background },
            headerTintColor: Colors.dark.primary,
            headerTitleStyle: { color: Colors.dark.text },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}