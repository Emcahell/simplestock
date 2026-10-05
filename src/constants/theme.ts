/**
 * StockFlow design tokens aligned with DESIGN.md
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0f172a',
    background: '#f8fafc',
    backgroundElement: '#f1f5f9',
    backgroundSelected: '#e2e8f0',
    textSecondary: '#475569',
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    border: '#e2e8f0',
  },
  dark: {
    text: '#fafafa',
    background: '#09090b',
    backgroundElement: '#16171f',
    backgroundSelected: '#1f202b',
    textSecondary: '#a1a1aa',
    primary: '#a78bfa',
    primaryHover: '#c4b5fd',
    border: '#27272a',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = {
  sans: 'system-ui',
  serif: 'ui-serif',
  rounded: 'ui-rounded',
  mono: 'ui-monospace',
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
