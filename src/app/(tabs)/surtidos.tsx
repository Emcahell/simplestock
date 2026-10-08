import { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { PrimaryActionButton } from '@/components/primary-action-button';
import surtidosData from '@/data/surtidos.json';
import { ICONS, SURFACE } from '@/features/surtidos/icon-map';
import { MonthFilter } from '@/features/surtidos/month-filter';
import { RestockCard } from '@/features/surtidos/restock-card';
import type { SurtidosData } from '@/features/surtidos/types';

const MODULE_NAME = 'Surtidos';

const data = surtidosData as SurtidosData;

export default function SurtidosScreen() {
  const [periodId, setPeriodId] = useState('all');
  const [pickerOpen, setPickerOpen] = useState(false);

  const selectedPeriod = useMemo(
    () => data.periods.find((period) => period.id === periodId) ?? data.periods[0],
    [periodId]
  );

  const visibleRestocks = useMemo(() => {
    if (periodId === 'all') return data.restocks;
    return data.restocks.filter((restock) => restock.periodId === periodId);
  }, [periodId]);

  return (
    <View className="flex-1 bg-surface">
      <AppHeader moduleName={MODULE_NAME} appName={data.appName} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4">
          {/* Acción principal */}
          <View className="w-full pt-1">
            <PrimaryActionButton label={data.action.label} />
          </View>

          {/* Filtro por periodo + total de movimientos */}
          <MonthFilter
            data={data.filter}
            periods={data.periods}
            value={periodId}
            count={selectedPeriod.count}
            isOpen={pickerOpen}
            onOpen={() => setPickerOpen(true)}
            onClose={() => setPickerOpen(false)}
            onSelect={(id) => {
              setPeriodId(id);
              setPickerOpen(false);
            }}
          />

          {/* Historial */}
          <View className="w-full gap-3 pt-1 pb-2">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-1.5">
                <ICONS.history size={15} color={SURFACE.primary} weight="bold" />
                <Text
                  className="text-sm font-semibold text-on-surface-variant"
                  style={{ letterSpacing: 0.8 }}
                >
                  {data.history.title.toUpperCase()}
                </Text>
              </View>
              <Text
                className="text-sm text-on-surface-variant"
                style={{ color: SURFACE.onSurfaceVariant }}
              >
                {visibleRestocks.length} de {selectedPeriod.count}{' '}
                {data.history.shownSuffix}
              </Text>
            </View>

            {visibleRestocks.map((restock) => (
              <RestockCard
                key={restock.id}
                restock={restock}
                resultingStockLabel={data.history.resultingStockLabel}
              />
            ))}

            {visibleRestocks.length === 0 ? (
              <View className="w-full items-center rounded-xl bg-surface-container px-4 py-8">
                <Text className="text-sm" style={{ color: SURFACE.onSurfaceVariant }}>
                  {data.history.emptyLabel}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}