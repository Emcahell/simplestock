import { ScrollView, Text, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import inicio from '@/data/inicio.json';
import { ActivityRow } from '@/features/inicio/activity-row';
import { ICONS } from '@/features/inicio/icon-map';
import { MetricCard } from '@/features/inicio/metric-card';
import { QuickAction } from '@/features/inicio/quick-action';
import type { HomeData } from '@/features/inicio/types';

const MODULE_NAME = 'Inicio';

const data = inicio as HomeData;

export default function HomeScreen() {
  const { greeting, metrics, quickActions, activity } = data;

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
            Hola, {greeting.name} 👋
          </Text>
          <Text className="mt-0.5 text-sm text-on-surface-variant">
            {greeting.dateLabel}
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
                {metrics.products.value}
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
              {metrics.sales.amountWhole}
              <Text className="text-lg font-medium text-on-surface-variant">
                {metrics.sales.amountCents}
              </Text>
            </Text>

            <View className="mt-1 flex-row items-center gap-1">
              {(() => {
                const FooterIcon = ICONS[metrics.sales.footerIcon];
                return (
                  <>
                    <FooterIcon size={14} color="#a1a1aa" />
                    <Text className="text-sm text-on-surface-variant" style={{ fontWeight: '500' }}>
                      {metrics.sales.footerLabel}
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
            <View className="flex-row items-center gap-0.5">
              <Text className="text-sm text-primary" style={{ fontWeight: '500' }}>
                {activity.linkLabel}
              </Text>
              <Text className="text-sm text-primary">›</Text>
            </View>
          </View>

          <View className="overflow-hidden rounded-xl bg-surface-container">
            {activity.items.map((item, index) => (
              <View key={item.id}>
                {index > 0 && (
                  <View className="mx-3.5 h-px bg-surface-container-high" />
                )}
                <ActivityRow {...item} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}