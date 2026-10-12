import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { ICONS } from '@/features/surtidos/icon-map';
import { useThemePreference } from '@/theme/theme-provider';

type RestockCardProps = {
  dateLabel: string;
  productName: string;
  productSku: string | null;
  imageUri: string | null;
  quantity: number;
  description: string;
  stockAfter: number;
  unitsLabel: string;
  stockLabel: string;
  editLabel: string;
  deleteLabel: string;
  onEdit: () => void;
  onDelete: () => void;
};

export function RestockCard({
  dateLabel,
  productName,
  productSku,
  imageUri,
  quantity,
  description,
  stockAfter,
  unitsLabel,
  stockLabel,
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
}: RestockCardProps) {
  const { colors } = useThemePreference();

  return (
    <View className="gap-3 rounded-xl bg-surface-container p-3.5">
      <View className="flex-row items-center justify-between gap-2">
        <View className="min-w-0 flex-1 flex-row items-center gap-1.5">
          <ICONS.schedule size={14} color={colors.onSurfaceVariant} weight="bold" />
          <Text
            numberOfLines={1}
            className="min-w-0 flex-1 text-sm"
            style={{ color: colors.onSurfaceVariant }}
          >
            {dateLabel}
          </Text>
        </View>

        <View className="flex-row items-center gap-1">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={editLabel}
            className="rounded-md p-1.5"
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            onPress={onEdit}
          >
            <ICONS.edit size={18} color={colors.onSurfaceVariant} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={deleteLabel}
            className="rounded-md p-1.5"
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            onPress={onDelete}
          >
            <ICONS.delete size={18} color={colors.onSurfaceVariant} />
          </Pressable>
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        <View
          className="h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-container-high"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              transition={150}
            />
          ) : (
            <ICONS.package size={26} color={colors.onSurfaceVariant} weight="bold" />
          )}
        </View>

        <View className="min-w-0 flex-1 gap-0.5">
          <View className="flex-row items-start justify-between gap-2">
            <Text
              numberOfLines={1}
              className="shrink text-base font-semibold"
              style={{ color: colors.onSurface }}
            >
              {productName}
            </Text>
            <View
              className="shrink-0 rounded-md px-2 py-0.5"
              style={{ backgroundColor: colors.success }}
            >
              <Text className="text-sm font-bold text-white">{unitsLabel}</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-1.5">
            {productSku ? (
              <>
                <Text
                  numberOfLines={1}
                  className="shrink text-2xs font-bold text-on-surface-variant"
                  style={{ letterSpacing: 0.8 }}
                >
                  {productSku.toUpperCase()}
                </Text>
                <View className="h-1 w-1 rounded-full bg-on-surface-variant" />
              </>
            ) : null}
            <Text
              numberOfLines={2}
              className="min-w-0 flex-1 text-sm"
              style={{ color: colors.onSurfaceVariant }}
            >
              {description}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-between rounded-lg bg-surface-container-low px-2.5 py-1.5">
        <View className="flex-row items-center gap-1.5">
          <ICONS.package size={15} color={colors.tertiary} weight="bold" />
          <Text className="text-sm" style={{ color: colors.onSurfaceVariant }}>
            {stockLabel}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          className="shrink text-sm font-bold"
          style={{ color: colors.onSurface }}
        >
          {stockAfter} unidades
        </Text>
      </View>
    </View>
  );
}