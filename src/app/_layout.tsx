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
import { ThemeProvider, useThemePreference } from '@/theme/theme-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { resolved, hydrated, colors } = useThemePreference();
  const navigationTheme =
    resolved === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;

  useEffect(() => {
    if (resolved) {
      void SystemUI.setBackgroundColorAsync(colors.background);
    }
  }, [resolved, colors]);

  if (!hydrated) {
    // El splash nativo sigue visible (`hideAsync` lo llama el overlay en su
    // onLayout) hasta que se lee el tema persistido: evita el flash de tema.
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
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="registros"
            options={{
              title: 'Registros de actividades',
              headerBackTitle: 'Volver',
              // El header nativo sigue la paleta del tema resuelto (mismo
              // fondo que las pantallas), no el esquema del sistema: en claro
              // quedaría una barra blanca sobre las pantallas oscuras.
              headerStyle: { backgroundColor: colors.surfaceContainer },
              headerTintColor: colors.primary,
              headerTitleStyle: { color: colors.onSurface },
              headerShadowVisible: false,
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="producto/nuevo"
            options={{
              title: 'Nuevo producto',
              headerBackTitle: 'Volver',
              headerStyle: { backgroundColor: colors.surfaceContainer },
              headerTintColor: colors.primary,
              headerTitleStyle: { color: colors.onSurface },
              headerShadowVisible: false,
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="producto/[id]/index"
            options={{
              title: 'Detalles del producto',
              headerBackTitle: 'Volver',
              headerStyle: { backgroundColor: colors.surfaceContainer },
              headerTintColor: colors.primary,
              headerTitleStyle: { color: colors.onSurface },
              headerShadowVisible: false,
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="producto/[id]/editar"
            options={{
              title: 'Editar producto',
              headerBackTitle: 'Volver',
              headerStyle: { backgroundColor: colors.surfaceContainer },
              headerTintColor: colors.primary,
              headerTitleStyle: { color: colors.onSurface },
              headerShadowVisible: false,
              headerTitleAlign: 'center',
            }}
          />
        </Stack>
      </NavigationThemeProvider>
    </>
  );
}