import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';

import { listActivities } from '@/db/activities';
import { toActivityItem } from '@/features/inicio/activity-item';
import { ActivityRow } from '@/features/inicio/activity-row';
import type { ActivityItem } from '@/features/inicio/types';

const PAGE_SIZE = 10;

export default function RegistrosScreen() {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useFocusEffect(
    useCallback(() => {
      let alive = true;
      async function load() {
        const rows = await listActivities();
        if (alive) {
          setItems(rows.map(toActivityItem));
          setVisible(PAGE_SIZE);
        }
      }
      void load();
      return () => {
        alive = false;
      };
    }, [])
  );

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
          {`${items.length} ${items.length === 1 ? 'registro' : 'registros'}`.toUpperCase()}
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
              Sin actividades registradas
            </Text>
          </View>
        ) : null}
      </View>

      {/* Carga incremental */}
      {hasMore ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ver más"
          accessibilityState={{ expanded: false }}
          onPress={() => setVisible((current) => current + PAGE_SIZE)}
          className="mt-4 w-full items-center justify-center rounded-xl border border-primary-outline bg-surface-container py-3"
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
        >
          <Text className="text-sm font-semibold text-primary">Ver más</Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}