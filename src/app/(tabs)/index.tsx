import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useFocusEffect, type Href } from 'expo-router';

import { AppHeader } from '@/components/app-header';
import inicio from '@/data/inicio.json';
import { listActivities } from '@/db/activities';
import { countProducts } from '@/db/products';
import { getSalesTodaySummary, type SalesTodaySummary } from '@/db/sales';
import { toActivityItem } from '@/features/inicio/activity-item';
import { ActivityRow } from '@/features/inicio/activity-row';
import { ICONS } from '@/features/inicio/icon-map';
import { MetricCard } from '@/features/inicio/metric-card';
import { QuickAction } from '@/features/inicio/quick-action';
import type { ActivityItem, HomeData } from '@/features/inicio/types';
import { useUser } from '@/features/user/user-provider';
import { useThemePreference } from '@/theme/theme-provider';
import { formatUSDPrice } from '@/utils/format';
import { MONTH_NAMES } from '@/utils/month-names';

const MODULE_NAME = 'Inicio';
const RECENT_ACTIVITIES = 5;

const QUICK_ACTION_ROUTES: Record<string, Href> = {
  'registrar-venta': '/venta/nueva',
  'ingresar-surtido': '/surtido/nuevo',
  'nuevo-articulo': '/producto/nuevo',
};

const data = inicio as HomeData;

export default function HomeScreen() {
  const { colors } = useThemePreference();
  const { name } = useUser();
  const { metrics, quickActions, activity } = data;

  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [salesToday, setSalesToday] = useState<SalesTodaySummary>({ count: 0, total: 0 });

  const dateLabel = useMemo(() => {
    const today = new Date();
    return `Hoy, ${today.getDate()} de ${MONTH_NAMES[today.getMonth()]}`;
  }, []);

  useFocusEffect(
    useCallback(() => {
      let alive = true;
      async function load() {
        const [rows, count, today] = await Promise.all([
          listActivities(RECENT_ACTIVITIES),
          countProducts(),
          getSalesTodaySummary(),
        ]);
        if (!alive) return;
        setActivities(rows.map(toActivityItem));
        setProductCount(count);
        setSalesToday(today);
      }
      void load();
      return () => {
        alive = false;
      };
    }, [])
  );

  const formattedTotal = formatUSDPrice(salesToday.total);
  const [amountWhole, amountCents] = formattedTotal.split('.');
  const salesFooterLabel = `${salesToday.count} ${
    salesToday.count === 1 ? 'venta' : 'ventas'
  }`;

  return (
    <View className="flex-1 bg-surface">
      <AppHeader moduleName={MODULE_NAME} appName={data.appName} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Saludo */}
        <View className="pt-2">
          <Text
            className="text-2xl font-semibold text-on-surface"
            style={{ letterSpacing: -0.3 }}
          >
            Hola, {name} 👋
          </Text>
          <Text className="mt-0.5 text-sm text-on-surface-variant">
            {dateLabel}
          </Text>
        </View>

        {/* Métricas principales */}
        <View className="mt-6 flex-row gap-3">
          <MetricCard
            label={metrics.products.label}
            icon={metrics.products.icon}
            iconTone="primary"
            glowTone="primary"
          >
            <View className="flex-row items-baseline">
              <Text
                className="text-2xl font-bold text-on-surface"
                style={{ letterSpacing: -0.4 }}
              >
                {productCount}
              </Text>
              <Text className="ml-1 text-sm text-on-surface-variant">
                {metrics.products.unit}
              </Text>
            </View>
          </MetricCard>

          <MetricCard
            label={metrics.sales.label}
            icon={metrics.sales.icon}
            iconTone="success"
            glowTone="success"
          >
            <Text
              className="text-2xl font-bold text-on-surface"
              style={{ letterSpacing: -0.4 }}
            >
              {`$${amountWhole}`}
              <Text className="text-lg font-medium text-on-surface-variant">
                {`.${amountCents}`}
              </Text>
            </Text>

            <View className="mt-1 flex-row items-center gap-1">
              {(() => {
                const FooterIcon = ICONS[metrics.sales.footerIcon];
                return (
                  <>
                    <FooterIcon size={14} color={colors.onSurfaceVariant} />
                    <Text className="text-sm text-on-surface-variant" style={{ fontWeight: '500' }}>
                      {salesFooterLabel}
                    </Text>
                  </>
                );
              })()}
            </View>
          </MetricCard>
        </View>

        {/* Accesos rápidos */}
        <View className="mt-6">
          <Text
            className="text-sm font-medium text-on-surface-variant"
            style={{ letterSpacing: 0.8 }}
          >
            {quickActions.title.toUpperCase()}
          </Text>

          <View className="mt-2.5 flex-row gap-2.5">
            {quickActions.items.map((action) => (
              <QuickAction
                key={action.id}
                label={action.label}
                icon={action.icon}
                tone={action.tone}
                variant={action.variant}
                onPress={() => {
                  const target = QUICK_ACTION_ROUTES[action.id];
                  if (target) router.push(target);
                }}
              />
            ))}
          </View>
        </View>

        {/* Actividad reciente */}
        <View className="mt-6 pb-4">
          <View className="mb-3 flex-row items-center justify-between">
            <Text
              className="text-sm font-medium text-on-surface-variant"
              style={{ letterSpacing: 0.8 }}
            >
              {activity.title.toUpperCase()}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={activity.linkLabel}
              hitSlop={8}
              onPress={() => router.push('/registros')}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <View className="flex-row items-center gap-0.5">
                <Text className="text-sm text-primary" style={{ fontWeight: '500' }}>
                  {activity.linkLabel}
                </Text>
                <Text className="text-sm text-primary">›</Text>
              </View>
            </Pressable>
          </View>

          <View className="overflow-hidden rounded-xl bg-surface-container">
            {activities.map((item, index) => (
              <View key={item.id}>
                {index > 0 && (
                  <View className="mx-3.5 h-px bg-surface-container-high" />
                )}
                <ActivityRow {...item} />
              </View>
            ))}

            {activities.length === 0 ? (
              <View className="items-center px-4 py-8">
                <Text className="text-sm text-on-surface-variant">
                  Sin actividades registradas
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}