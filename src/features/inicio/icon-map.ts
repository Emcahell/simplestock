import {
  PackageIcon,
  PlusCircleIcon,
  PlusIcon,
  ScrollIcon,
  SlidersIcon,
  StorefrontIcon,
  TrayIcon,
  type Icon,
} from 'phosphor-react-native';

import type { IconName, Tone } from '@/features/inicio/types';

export const ICONS: Record<IconName, Icon> = {
  package: PackageIcon,
  scroll: ScrollIcon,
  storefront: StorefrontIcon,
  tray: TrayIcon,
  plusCircle: PlusCircleIcon,
  plusSimple: PlusIcon,
  sliders: SlidersIcon,
};

/** Hex tokens mirroring `tailwind.config.js` (phosphor needs a real color value). */
export const TONE_COLOR: Record<Tone, string> = {
  primary: '#a78bfa',
  success: '#34d399',
  muted: '#a1a1aa',
};

export const TONE_VALUE_STYLE: Record<Tone, { color: string; bold: boolean }> = {
  primary: { color: '#a78bfa', bold: false },
  success: { color: '#34d399', bold: true },
  muted: { color: '#a1a1aa', bold: false },
};