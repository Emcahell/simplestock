import {
  CaretDownIcon,
  CaretRightIcon,
  CheckIcon,
  ClockCounterClockwiseIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  PackageIcon,
  PencilSimpleIcon,
  TrashIcon,
  XIcon,
  type Icon,
} from 'phosphor-react-native';

export const ICONS = {
  search: MagnifyingGlassIcon,
  clear: XIcon,
  caretDown: CaretDownIcon,
  caretRight: CaretRightIcon,
  check: CheckIcon,
  edit: PencilSimpleIcon,
  delete: TrashIcon,
  history: ClockCounterClockwiseIcon,
  schedule: ClockIcon,
  package: PackageIcon,
} satisfies Record<string, Icon>;