import { Text, View } from 'react-native';

import { ICONS, SURFACE } from '@/features/surtidos/icon-map';
import type { SurtidosData } from '@/features/surtidos/types';

type RestockCardProps = {
  restock: SurtidosData['restocks'][number];
  resultingStockLabel: string;
};

export function RestockCard({ restock, resultingStockLabel }: RestockCardProps) {
  return (
    <View className="gap-3 rounded-xl bg-surface-container p-3.5">
      <View className="flex-row items-center gap-1.5">
        <ICONS.schedule size={14} color={SURFACE.onSurfaceVariant} weight="bold" />
        <Text
          className="text-sm"
          style={{ color: SURFACE.onSurfaceVariant }}
        >
          {restock.dateLabel}
        </Text>
      </View>

      <View className="flex-row items-center gap-3">
        <View
          className="h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-surface-container-high"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <ICONS.inventory size={26} color={SURFACE.onSurfaceVariant} weight="bold" />
        </View>

        <View className="min-w-0 flex-1 gap-0.5">
          <View className="flex-row items-start justify-between gap-2">
            <Text
              numberOfLines={1}
              className="shrink text-base font-semibold"
              style={{ color: SURFACE.onSurface }}
            >
              {restock.productName}
            </Text>
            <View
              className="shrink-0 rounded-md px-2 py-0.5"
              style={{ backgroundColor: SURFACE.tertiaryContainer }}
            >
              <Text
                className="text-sm font-bold"
                style={{ color: SURFACE.tertiary }}
              >
                {restock.quantityLabel}
              </Text>
            </View>
          </View>
          <Text
            numberOfLines={1}
            className="text-sm"
            style={{ color: SURFACE.onSurfaceVariant }}
          >
            {restock.referenceLabel}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between rounded-lg bg-surface-container-low px-2.5 py-1.5">
        <View className="flex-row items-center gap-1.5">
          <ICONS.inventory size={15} color={SURFACE.secondary} weight="bold" />
          <Text
            className="text-sm"
            style={{ color: SURFACE.onSurfaceVariant }}
          >
            {resultingStockLabel}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          className="shrink text-sm font-bold"
          style={{ color: SURFACE.onSurface }}
        >
          {restock.stockLabel}
        </Text>
      </View>
    </View>
  );
}