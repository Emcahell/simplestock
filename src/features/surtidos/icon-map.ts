import {
  CalendarBlankIcon,
  CaretDownIcon,
  ClockCounterClockwiseIcon,
  ClockIcon,
  PackageIcon,
  type Icon,
} from 'phosphor-react-native';

export const ICONS = {
  calendar: CalendarBlankIcon,
  caretDown: CaretDownIcon,
  history: ClockCounterClockwiseIcon,
  schedule: ClockIcon,
  inventory: PackageIcon,
} satisfies Record<string, Icon>;

/** Hex tokens mirroring `tailwind.config.js` (phosphor needs a real color value). */
export const SURFACE = {
  onPrimary: '#09090b',
  onSurface: '#fafafa',
  onSurfaceVariant: '#a1a1aa',
  primary: '#a78bfa',
  tertiary: '#92ccff',
  tertiaryContainer: '#004b73',
  secondary: '#bec6e0',
} as const;