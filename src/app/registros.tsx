import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import registrosData from '@/data/registros.json';
import { ActivityRow } from '@/features/inicio/activity-row';
import type { RegistrosData } from '@/features/registros/types';

const data = registrosData as RegistrosData;

export default function RegistrosScreen() {
  const items = data.items;
  const [visible, setVisible] = useState(data.pageSize);

  const shown = useMemo(() => items.slice(0, visible), [items, visible]);
  const hasMore = visible < items.length;

  return (
    <ScrollView
      className="flex-1 bg-surface"
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Resumen */}
      <View className="flex-row items-center justify-between">
        <Text
          className="text-sm font-medium text-on-surface-variant"
          style={{ letterSpacing: 0.8 }}
        >
          {`${items.length} ${data.summaryLabel}`.toUpperCase()}
        </Text>
        <Text className="text-sm text-on-surface-variant">
          {shown.length} de {items.length}
        </Text>
      </View>

      {/* Lista de actividades */}
      <View className="mt-3 overflow-hidden rounded-xl bg-surface-container">
        {shown.map((item, index) => (
          <View key={item.id}>
            {index > 0 && (
              <View className="mx-3.5 h-px bg-surface-container-high" />
            )}
            <ActivityRow {...item} />
          </View>
        ))}

        {shown.length === 0 ? (
          <View className="items-center px-4 py-8">
            <Text className="text-sm text-on-surface-variant">
              {data.emptyLabel}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Carga incremental */}
      {hasMore ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={data.showMoreLabel}
          accessibilityState={{ expanded: false }}
          onPress={() => setVisible((current) => current + data.pageSize)}
          className="mt-4 w-full items-center justify-center rounded-xl border border-primary/40 bg-surface-container py-3"
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
        >
          <Text className="text-sm font-semibold text-primary">
            {data.showMoreLabel}
          </Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}