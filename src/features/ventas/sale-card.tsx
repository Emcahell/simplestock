import { Pressable, Text, View } from 'react-native';

import { ICONS } from '@/features/ventas/icon-map';
import { useThemePreference } from '@/theme/theme-provider';

type SaleCardProps = {
  code: string;
  dateLabel: string;
  itemsSummary: string;
  amount: string;
  currency: string;
  detailLabel: string;
  onPressDetails: () => void;
};

export function SaleCard({
  code,
  dateLabel,
  itemsSummary,
  amount,
  currency,
  detailLabel,
  onPressDetails,
}: SaleCardProps) {
  const { colors } = useThemePreference();

  return (
    <View className="w-full rounded-xl bg-surface-container p-3.5">
      <View className="mb-1.5 flex-row items-center justify-between">
        <Text
          className="text-sm font-semibold"
          style={{ color: colors.primary, letterSpacing: -0.2 }}
        >
          {code}
        </Text>
        <Text className="text-sm" style={{ color: colors.onSurfaceVariant }}>
          {dateLabel}
        </Text>
      </View>

      <Text
        numberOfLines={2}
        className="mb-2.5 pr-2 text-sm text-on-surface-variant"
      >
        {itemsSummary}
      </Text>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-baseline gap-1">
          <Text
            className="text-base font-bold"
            style={{ color: colors.success, letterSpacing: -0.2 }}
          >
            {amount}
          </Text>
          <Text className="text-2xs" style={{ color: colors.onSurfaceVariant }}>
            {currency}
          </Text>
        </View>

        <Pressable
          onPress={onPressDetails}
          accessibilityRole="button"
          accessibilityLabel={detailLabel}
          className="flex-row items-center gap-1"
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <Text
            className="text-sm font-medium"
            style={{ color: colors.onSurfaceVariant }}
          >
            {detailLabel}
          </Text>
          <ICONS.caretRight size={15} color={colors.onSurfaceVariant} weight="bold" />
        </Pressable>
      </View>
    </View>
  );
}