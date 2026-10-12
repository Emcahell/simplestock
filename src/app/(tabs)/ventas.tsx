import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { AppHeader } from '@/components/app-header';
import { PeriodFilter, type PeriodSelection } from '@/components/period-filter';
import { PrimaryActionButton } from '@/components/primary-action-button';
import { listSales, type SaleWithItems } from '@/db/sales';
import { SaleCard } from '@/features/ventas/sale-card';
import { TotalCard } from '@/features/ventas/total-card';
import { useThemePreference } from '@/theme/theme-provider';
import { formatDateTimeLabel, formatUSDPrice, parseStoredDate } from '@/utils/format';
import { MONTH_NAMES } from '@/utils/month-names';

const MODULE_NAME = 'Ventas';
const APP_NAME = 'SimpleStock';
const PAGE_SIZE = 10;
const TOTAL_LABEL = 'Total Recaudado';

export default function VentasScreen() {
  const { colors } = useThemePreference();
  const now = useMemo(() => new Date(), []);
  const currentMonth = now.getMonth();

  const [period, setPeriod] = useState<PeriodSelection>('all');
  const [panelOpen, setPanelOpen] = useState(false);
  const [draft, setDraft] = useState<number>(currentMonth);
  const [totalExpanded, setTotalExpanded] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sales, setSales] = useState<SaleWithItems[]>([]);

  const load = useCallback(async () => {
    setSales(await listSales());
  }, []);

  useFocusEffect(useCallback(() => {
    void load();
  }, [load]));

  const visibleSales = useMemo(() => {
    if (period === 'all') return sales;
    return sales.filter((sale) => {
      const parsed = parseStoredDate(sale.created_at);
      return !Number.isNaN(parsed.getTime()) && parsed.getMonth() === period;
    });
  }, [period, sales]);

  const monthTotal = useMemo(
    () => visibleSales.reduce((sum, sale) => sum + sale.total, 0),
    [visibleSales]
  );

  const shownSales = useMemo(
    () => visibleSales.slice(0, visibleCount),
    [visibleSales, visibleCount]
  );
  const hasMore = visibleCount < visibleSales.length;

  return (
    <View className="flex-1 bg-surface">
      <AppHeader moduleName={MODULE_NAME} appName={APP_NAME} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4">
          {/* Acción principal */}
          <View className="w-full pt-1">
            <PrimaryActionButton
              label="Registrar nueva venta"
              onPress={() => router.push('/venta/nueva')}
            />
          </View>

          {/* Filtro por periodo */}
          <PeriodFilter
            allLabel="Todo"
            monthLabel="Este mes"
            navigateLabel="Navegar meses"
            applyLabel="Aplicar"
            cancelLabel="Cancelar"
            monthNames={MONTH_NAMES}
            value={period}
            currentMonth={currentMonth}
            isOpen={panelOpen}
            draft={draft}
            onSelectAll={() => {
              setPeriod('all');
              setPanelOpen(false);
            }}
            onTogglePanel={() => {
              if (panelOpen) {
                setPanelOpen(false);
                return;
              }
              setDraft(period === 'all' ? currentMonth : period);
              setPanelOpen(true);
            }}
            onDraftChange={setDraft}
            onApply={(month) => {
              setPeriod(month);
              setPanelOpen(false);
            }}
            onCancel={() => setPanelOpen(false)}
          />

          {/* Total recaudado (solo cuando hay un mes seleccionado) */}
          {period !== 'all' ? (
            <TotalCard
              label={TOTAL_LABEL}
              amount={formatUSDPrice(monthTotal)}
              currency="USD"
              expanded={totalExpanded}
              onToggle={() => setTotalExpanded((prev) => !prev)}
            />
          ) : null}

          {/* Lista de ventas */}
          <View className="w-full gap-2.5 pb-2">
            <View className="flex-row items-baseline justify-between pt-1">
              <View className="flex-row items-center gap-1.5">
                <Text
                  className="text-sm font-semibold text-on-surface-variant"
                  style={{ letterSpacing: 0.8 }}
                >
                  VENTAS
                </Text>
                <View className="rounded-full bg-surface-container-high px-1.5 py-0.5">
                  <Text className="text-2xs font-bold" style={{ color: colors.onSurfaceVariant }}>
                    {visibleSales.length}
                  </Text>
                </View>
              </View>
              <Text className="text-sm text-on-surface-variant">
                Mostrando {shownSales.length} de {visibleSales.length}
              </Text>
            </View>

            {shownSales.map((sale) => (
              <SaleCard
                key={sale.id}
                code={sale.code}
                dateLabel={formatDateTimeLabel(sale.created_at)}
                itemsSummary={sale.items
                  .map((item) => `${item.quantity}x ${item.product_name}`)
                  .join(', ')}
                amount={formatUSDPrice(sale.total)}
                currency="USD"
                detailLabel="Ver detalles"
                onPressDetails={() =>
                  router.push({ pathname: '/venta/[id]', params: { id: sale.id } })
                }
              />
            ))}

            {shownSales.length === 0 ? (
              <View className="w-full items-center rounded-xl bg-surface-container px-4 py-8">
                <Text className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                  Sin ventas para el periodo seleccionado
                </Text>
              </View>
            ) : null}

            {hasMore ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Ver más"
                accessibilityState={{ expanded: false }}
                onPress={() => setVisibleCount((current) => current + PAGE_SIZE)}
                className="mt-1 w-full items-center justify-center rounded-xl border border-primary-outline bg-surface-container py-3"
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className="text-sm font-semibold text-primary">Ver más</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}