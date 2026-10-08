import type { Tone } from '@/features/inicio/types';

export type ThemeName = 'light' | 'dark';

export type ToneValueStyle = { color: string; bold: boolean };

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  surfaceVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  onSurface: string;
  onSurfaceVariant: string;
  onBackground: string;
  primary: string;
  onPrimary: string;
  primarySoft: string;
  primaryOutline: string;
  secondary: string;
  tertiary: string;
  tertiaryContainer: string;
  success: string;
  error: string;
  muted: string;
  textSecondary: string;
  border: string;
  toneColor: Record<Tone, string>;
  toneValueStyle: Record<Tone, ToneValueStyle>;
};

const BASE_DARK: Omit<ThemeColors, 'toneColor' | 'toneValueStyle'> = {
  background: '#09090b',
  surface: '#0c0c0f',
  surfaceContainerLowest: '#09090b',
  surfaceContainerLow: '#0f1017',
  surfaceContainer: '#16171f',
  surfaceContainerHigh: '#1f202b',
  surfaceContainerHighest: '#27272a',
  surfaceVariant: '#2f2f37',
  surfaceDim: '#0a0a0e',
  surfaceBright: '#131318',
  onSurface: '#fafafa',
  onSurfaceVariant: '#a1a1aa',
  onBackground: '#fafafa',
  primary: '#a78bfa',
  onPrimary: '#09090b',
  primarySoft: 'rgba(9, 9, 11, 0.1)',
  primaryOutline: 'rgba(167, 139, 250, 0.4)',
  secondary: '#bec6e0',
  tertiary: '#92ccff',
  tertiaryContainer: '#004b73',
  success: '#34d399',
  error: '#ef4444',
  muted: '#a1a1aa',
  textSecondary: '#a1a1aa',
  border: '#27272a',
};

const BASE_LIGHT: Omit<ThemeColors, 'toneColor' | 'toneValueStyle'> = {
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f8fafc',
  surfaceContainer: '#f1f5f9',
  surfaceContainerHigh: '#e2e8f0',
  surfaceContainerHighest: '#d3d9e3',
  surfaceVariant: '#e2e8f0',
  surfaceDim: '#eef1f6',
  surfaceBright: '#ffffff',
  onSurface: '#0f172a',
  onSurfaceVariant: '#475569',
  onBackground: '#0f172a',
  primary: '#7c3aed',
  onPrimary: '#ffffff',
  primarySoft: 'rgba(255, 255, 255, 0.22)',
  primaryOutline: 'rgba(124, 58, 237, 0.35)',
  secondary: '#475569',
  tertiary: '#0369a1',
  tertiaryContainer: '#bae6fd',
  success: '#16a34a',
  error: '#dc2626',
  muted: '#64748b',
  textSecondary: '#475569',
  border: '#e2e8f0',
};

function buildPalette(
  base: Omit<ThemeColors, 'toneColor' | 'toneValueStyle'>
): ThemeColors {
  return {
    ...base,
    toneColor: {
      primary: base.primary,
      success: base.success,
      muted: base.muted,
    },
    toneValueStyle: {
      primary: { color: base.primary, bold: false },
      success: { color: base.success, bold: true },
      muted: { color: base.muted, bold: false },
    },
  };
}

export const palettes: Record<ThemeName, ThemeColors> = {
  dark: buildPalette(BASE_DARK),
  light: buildPalette(BASE_LIGHT),
};

/** Turns a palette into the `--color-<token>` map consumed by NativeWind `vars()`. */
export function paletteToVars(colors: ThemeColors): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      vars[`--color-${key}`] = value;
    }
  }
  return vars;
}