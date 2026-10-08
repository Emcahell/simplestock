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

import type { IconName } from '@/features/inicio/types';

export const ICONS: Record<IconName, Icon> = {
  package: PackageIcon,
  scroll: ScrollIcon,
  storefront: StorefrontIcon,
  tray: TrayIcon,
  plusCircle: PlusCircleIcon,
  plusSimple: PlusIcon,
  sliders: SlidersIcon,
};