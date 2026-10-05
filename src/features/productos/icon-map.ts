import {
  CaretRightIcon,
  HandTapIcon,
  ListIcon,
  MagnifyingGlassIcon,
  PackageIcon,
  PencilSimpleIcon,
  PlusIcon,
  SquaresFourIcon,
  TrashIcon,
  XIcon,
  type Icon,
} from 'phosphor-react-native';

export const ICONS = {
  plus: PlusIcon,
  search: MagnifyingGlassIcon,
  clear: XIcon,
  caretRight: CaretRightIcon,
  detailHint: HandTapIcon,
  edit: PencilSimpleIcon,
  delete: TrashIcon,
  list: ListIcon,
  grid: SquaresFourIcon,
  package: PackageIcon,
} satisfies Record<string, Icon>;

/** Hex tokens mirroring `tailwind.config.js` (phosphor needs a real color value). */
export const SURFACE = {
  onPrimary: '#09090b',
  onSurface: '#fafafa',
  onSurfaceVariant: '#a1a1aa',
  primary: '#a78bfa',
  success: '#34d399',
  danger: '#ef4444',
} as const;