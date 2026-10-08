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