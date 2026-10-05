import {
  BankIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  CreditCardIcon,
  HandCoinsIcon,
  PlusIcon,
  type Icon,
} from 'phosphor-react-native';

import type { PaymentIcon } from '@/features/ventas/types';

export const ICONS = {
  action: PlusIcon,
  creditCard: CreditCardIcon,
  bank: BankIcon,
  banknote: HandCoinsIcon,
  caretDown: CaretDownIcon,
  caretUp: CaretUpIcon,
  caretLeft: CaretLeftIcon,
  caretRight: CaretRightIcon,
} satisfies Record<string, Icon>;

export const PAYMENT_ICONS: Record<PaymentIcon, Icon> = {
  creditCard: CreditCardIcon,
  bank: BankIcon,
  banknote: HandCoinsIcon,
};

/** Hex tokens mirroring `tailwind.config.js` (phosphor needs a real color value). */
export const SURFACE = {
  onPrimary: '#09090b',
  onSurface: '#fafafa',
  onSurfaceVariant: '#a1a1aa',
  primary: '#a78bfa',
  success: '#34d399',
} as const;