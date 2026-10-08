import { Pressable, Text, View } from 'react-native';

import { ICONS } from '@/features/productos/icon-map';
import type { ViewMode } from '@/features/productos/types';
import { useThemePreference } from '@/theme/theme-provider';

type ProductCardProps = {
  mode: ViewMode;
  name: string;
  sku: string;
  categoryLabel: string;
  price: string;
  stock: number;
  currency: string;
  stockTemplate: string;
  detailHint: string;
  editLabel: string;
  deleteLabel: string;
  onPress?: () => void;
};

export function ProductCard({
  mode,
  name,
  sku,
  categoryLabel,
  price,
  stock,
  currency,
  stockTemplate,
  detailHint,
  editLabel,
  deleteLabel,
  onPress,
}: ProductCardProps) {
  const { colors } = useThemePreference();
  const isGrid = mode === 'grid';
  const hasStock = stock > 0;

  const stockText = stockTemplate.replace('{count}', String(stock));

  const priceBlock = (
    <Text
      className="text-lg font-bold text-on-surface"
      style={{ letterSpacing: -0.3 }}
    >
      {price}{' '}
      <Text
        className="text-2xs font-normal"
        style={{ color: colors.onSurfaceVariant }}
      >
        {currency}
      </Text>
    </Text>
  );

  // El stock solo se muestra cuando hay existencias.
  const stockBlock = hasStock ? (
    <View className="flex-row items-center gap-1.5">
      <View
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: colors.success }}
      />
      <Text
        className="text-sm font-medium"
        style={{ color: colors.success }}
      >
        {stockText}
      </Text>
    </View>
  ) : null;

  const thumb = (
    <View
      className="items-center justify-center overflow-hidden rounded-lg bg-surface-container-lowest"
      style={{
        width: isGrid ? undefined : 80,
        height: isGrid ? 88 : 80,
      }}
    >
      <ICONS.package
        size={isGrid ? 26 : 24}
        color={colors.onSurfaceVariant}
        weight="duotone"
      />
    </View>
  );

  const meta = (
    <View className="flex-row items-center justify-between gap-1">
      <Text
        numberOfLines={1}
        className="shrink-0 text-2xs font-bold text-on-surface-variant"
        style={{ letterSpacing: 0.8 }}
      >
        {`${categoryLabel.toUpperCase()} • ${sku}`}
      </Text>
      {isGrid ? null : (
        <ICONS.caretRight
          size={16}
          color={colors.onSurfaceVariant}
          weight="bold"
        />
      )}
    </View>
  );

  const title = (
    <Text
      numberOfLines={isGrid ? 2 : 1}
      className="text-base font-semibold text-on-surface"
      style={{ letterSpacing: -0.2 }}
    >
      {name}
    </Text>
  );

  const actions = (
    <View className="flex-row items-center gap-1">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={editLabel}
        className="rounded-md p-1.5"
        style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
      >
        <ICONS.edit size={18} color={colors.onSurfaceVariant} />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={deleteLabel}
        className="rounded-md p-1.5"
        style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
      >
        <ICONS.delete size={18} color={colors.onSurfaceVariant} />
      </Pressable>
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={name}
      className="overflow-hidden rounded-xl bg-surface-container"
      style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
    >
      {isGrid ? (
        <>
          <View className="w-full">{thumb}</View>
          <View className="gap-1.5 p-3">
            {meta}
            {title}
            <View className="flex-row items-baseline justify-between gap-1 pt-0.5">
              {priceBlock}
            </View>
            {stockBlock ? <View>{stockBlock}</View> : null}
            <View className="flex-row items-center justify-end pt-1">
              {actions}
            </View>
          </View>
        </>
      ) : (
        <>
          <View className="flex-row items-start gap-3.5 p-3.5">
            {thumb}
            <View className="h-20 flex-1 flex-col justify-between">
              <View className="min-w-0">
                {meta}
                <View className="mt-0.5">{title}</View>
              </View>
              <View className="flex-row items-center justify-between pt-1">
                {priceBlock}
                {stockBlock}
              </View>
            </View>
          </View>

          <View className="flex-row items-center justify-between rounded-lg bg-surface-container-low px-2.5 py-1.5">
            <View className="flex-row items-center gap-1">
              <ICONS.detailHint size={13} color={colors.onSurfaceVariant} />
              <Text
                className="text-sm"
                style={{ color: colors.onSurfaceVariant }}
              >
                {detailHint}
              </Text>
            </View>
            {actions}
          </View>
        </>
      )}
    </Pressable>
  );
}