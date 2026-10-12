import {
  CaretDownIcon,
  CaretRightIcon,
  CaretUpIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  PackageIcon,
  PencilSimpleIcon,
  PlusIcon,
  ScrollIcon,
  TrashIcon,
  XIcon,
  type Icon,
} from 'phosphor-react-native';

export const ICONS = {
  plus: PlusIcon,
  search: MagnifyingGlassIcon,
  clear: XIcon,
  check: CheckIcon,
  edit: PencilSimpleIcon,
  delete: TrashIcon,
  package: PackageIcon,
  scroll: ScrollIcon,
  caretDown: CaretDownIcon,
  caretUp: CaretUpIcon,
  caretRight: CaretRightIcon,
} satisfies Record<string, Icon>;