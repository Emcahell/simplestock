import { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { PrimaryActionButton } from '@/components/primary-action-button';
import ventasData from '@/data/ventas.json';
import { SURFACE } from '@/features/ventas/icon-map';
import { PeriodFilter } from '@/features/ventas/period-filter';
import { SaleCard } from '@/features/ventas/sale-card';
import { TotalCard } from '@/features/ventas/total-card';
import type { PeriodSelection, VentasData } from '@/features/ventas/types';

const MODULE_NAME = 'Ventas';

const data = ventasData as VentasData;

export default function VentasScreen() {
  const now = useMemo(() => new Date(), []);
  const currentMonth = now.getMonth();

  const [period, setPeriod] = useState<PeriodSelection>('all');
  const [panelOpen, setPanelOpen] = useState(false);
  const [draft, setDraft] = useState<number>(currentMonth);
  const [totalExpanded, setTotalExpanded] = useState(true);

  const totals = useMemo(() => {
    if (period === 'all') return data.totals.all;
    return (
      data.totals.months.find((entry) => entry.month === period) ?? {
        amount: '—',
        count: 0,
      }
    );
  }, [period]);

  const visibleSales = useMemo(() => {
    if (period === 'all') return data.sales.items;
    return data.sales.items.filter((sale) => {
      const parsed = new Date(`${sale.date}T00:00:00`);
      return !Number.isNaN(parsed.getTime()) && parsed.getMonth() === period;
    });
  }, [period]);

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

          {/* Filtro por periodo */}
          <PeriodFilter
            data={data.filter}
            monthNames={data.monthNames}
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

          {/* Total recaudado */}
          <TotalCard
            label={data.summary.label}
            amount={totals.amount}
            currency={data.summary.currency}
            expanded={totalExpanded}
            onToggle={() => setTotalExpanded((prev) => !prev)}
          />

          {/* Lista de transacciones */}
          <View className="w-full gap-2.5 pb-2">
            <View className="flex-row items-center justify-between pt-1">
              <View className="flex-row items-center gap-2">
                <Text
                  className="text-sm font-semibold text-on-surface-variant"
                  style={{ letterSpacing: 0.8 }}
                >
                  {data.sales.title.toUpperCase()}
                </Text>
                <View className="rounded-full bg-surface-container-high px-1.5 py-0.5">
                  <Text
                    className="text-2xs font-bold"
                    style={{ color: SURFACE.onSurfaceVariant }}
                  >
                    {totals.count}
                  </Text>
                </View>
              </View>
            </View>

            {visibleSales.map((sale) => (
              <SaleCard
                key={sale.id}
                id={sale.id}
                timeLabel={sale.timeLabel}
                paymentMethod={sale.paymentMethod}
                paymentIcon={sale.paymentIcon}
                itemsSummary={sale.itemsSummary}
                amount={sale.amount}
                noteLabel={data.sales.noteLabel}
                currency={data.summary.currency}
              />
            ))}

            {visibleSales.length === 0 ? (
              <View className="w-full items-center rounded-xl bg-surface-container px-4 py-8">
                <Text
                  className="text-sm"
                  style={{ color: SURFACE.onSurfaceVariant }}
                >
                  Sin transacciones para el periodo seleccionado
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}