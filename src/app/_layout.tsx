import '../global.css';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Stack,
  ThemeProvider as NavigationThemeProvider,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { UserProvider, useUser } from '@/features/user/user-provider';
import { ThemeProvider, useThemePreference } from '@/theme/theme-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <RootNavigator />
      </UserProvider>
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { resolved, hydrated, colors } = useThemePreference();
  const { name, ready } = useUser();
  const navigationTheme =
    resolved === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;

  useEffect(() => {
    if (resolved) {
      void SystemUI.setBackgroundColorAsync(colors.background);
    }
  }, [resolved, colors]);

  const hasName = Boolean(name);

  // El header nativo sigue la paleta del tema resuelto (mismo fondo que las
  // pantallas), no el esquema del sistema: en claro quedaría una barra blanca
  // sobre las pantallas oscuras.
  const header = {
    headerBackTitle: 'Volver',
    headerStyle: { backgroundColor: colors.surfaceContainer },
    headerTintColor: colors.primary,
    headerTitleStyle: { color: colors.onSurface },
    headerShadowVisible: false,
    headerTitleAlign: 'center' as const,
  };

  if (!hydrated || !ready) {
    // El splash nativo sigue visible (`hideAsync` lo llama el overlay en su
    // onLayout) hasta que se lee el tema persistido y el nombre del usuario:
    // evita el flash de tema y de la pantalla de bienvenida.
    return null;
  }

  return (
    <>
      <StatusBar style={resolved === 'dark' ? 'light' : 'dark'} />
      <AnimatedSplashOverlay />

      <NavigationThemeProvider
        value={{
          ...navigationTheme,
          colors: {
            ...navigationTheme.colors,
            primary: colors.primary,
            background: colors.background,
            card: colors.surfaceContainer,
            text: colors.onSurface,
            border: colors.border,
            notification: colors.primary,
          },
        }}
      >
        <Stack>
          <Stack.Protected guard={hasName}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="registros"
              options={{ title: 'Registros de actividades', ...header }}
            />
            <Stack.Screen
              name="producto/nuevo"
              options={{ title: 'Nuevo producto', ...header }}
            />
            <Stack.Screen
              name="producto/[id]/index"
              options={{ title: 'Detalles del producto', ...header }}
            />
            <Stack.Screen
              name="producto/[id]/editar"
              options={{ title: 'Editar producto', ...header }}
            />
            <Stack.Screen
              name="surtido/nuevo"
              options={{ title: 'Nuevo surtido', ...header }}
            />
            <Stack.Screen
              name="surtido/[id]/editar"
              options={{ title: 'Editar surtido', ...header }}
            />
            <Stack.Screen
              name="venta/nueva"
              options={{ title: 'Registrar venta', ...header }}
            />
            <Stack.Screen
              name="venta/[id]/index"
              options={{ title: 'Detalles de la venta', ...header }}
            />
            <Stack.Screen
              name="venta/[id]/editar"
              options={{ title: 'Editar venta', ...header }}
            />
          </Stack.Protected>

          <Stack.Protected guard={!hasName}>
            <Stack.Screen name="bienvenida" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      </NavigationThemeProvider>
    </>
  );
}