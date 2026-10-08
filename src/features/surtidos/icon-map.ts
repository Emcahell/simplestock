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