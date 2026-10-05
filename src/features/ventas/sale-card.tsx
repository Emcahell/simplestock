import { Pressable, Text, View } from 'react-native';

import { ICONS, PAYMENT_ICONS, SURFACE } from '@/features/ventas/icon-map';
import type { PaymentIcon } from '@/features/ventas/types';

type SaleCardProps = {
  id: string;
  timeLabel: string;
  paymentMethod: string;
  paymentIcon: PaymentIcon;
  itemsSummary: string;
  amount: string;
  noteLabel: string;
  currency: string;
};

export function SaleCard({
  id,
  timeLabel,
  paymentMethod,
  paymentIcon,
  itemsSummary,
  amount,
  noteLabel,
  currency,
}: SaleCardProps) {
  const PaymentIconComponent = PAYMENT_ICONS[paymentIcon];

  return (
    <View className="w-full rounded-xl bg-surface-container p-3.5">
      <View className="mb-1.5 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text
            className="text-sm font-semibold"
            style={{ color: SURFACE.primary, letterSpacing: -0.2 }}
          >
            #{id}
          </Text>

          <View className="flex-row items-center gap-1 rounded-full bg-surface-container-high px-2 py-0.5">
            <PaymentIconComponent size={11} color={SURFACE.onSurfaceVariant} />
            <Text
              className="text-2xs"
              style={{ color: SURFACE.onSurfaceVariant }}
            >
              {paymentMethod}
            </Text>
          </View>
        </View>

        <Text
          className="text-sm"
          style={{ color: SURFACE.onSurfaceVariant }}
        >
          {timeLabel}
        </Text>
      </View>

      <Text
        numberOfLines={1}
        className="mb-2.5 pr-2 text-sm text-on-surface-variant"
      >
        {itemsSummary}
      </Text>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-baseline gap-1">
          <Text
            className="text-base font-bold"
            style={{ color: SURFACE.success, letterSpacing: -0.2 }}
          >
            {amount}
          </Text>
          <Text
            className="text-2xs"
            style={{ color: SURFACE.onSurfaceVariant }}
          >
            {currency}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={noteLabel}
          className="flex-row items-center gap-1"
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <Text
            className="text-sm font-medium"
            style={{ color: SURFACE.onSurfaceVariant }}
          >
            {noteLabel}
          </Text>
          <ICONS.caretRight size={15} color={SURFACE.onSurfaceVariant} weight="bold" />
        </Pressable>
      </View>
    </View>
  );
}