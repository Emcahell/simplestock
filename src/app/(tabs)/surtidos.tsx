import { useCallback, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { AppHeader } from '@/components/app-header';
import { PeriodFilter, type PeriodSelection } from '@/components/period-filter';
import { PrimaryActionButton } from '@/components/primary-action-button';
import { listRestocks, deleteRestock, type RestockWithProduct } from '@/db/restocks';
import { ICONS } from '@/features/surtidos/icon-map';
import { RestockCard } from '@/features/surtidos/restock-card';
import { useThemePreference } from '@/theme/theme-provider';
import { MONTH_NAMES } from '@/utils/month-names';

const MODULE_NAME = 'Surtidos';
const APP_NAME = 'SimpleStock';
const PAGE_SIZE = 10;

const SHORT_MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function parseStoredDate(value: string): Date {
  const normalized = value.includes('T') ? value : value.replace(' ', 'T');
  const hasTz = normalized.endsWith('Z') || /[+-]\d{2}:?\d{2}$/.test(normalized);
  return new Date(hasTz ? normalized : `${normalized}Z`);
}

function formatDateTimeLabel(value: string): string {
  const date = parseStoredDate(value);
  const day = date.getDate();
  const month = SHORT_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${year}, ${hours}:${minutes} ${meridiem}`;
}

export default function SurtidosScreen() {
  const { colors } = useThemePreference();
  const now = useMemo(() => new Date(), []);
  const currentMonth = now.getMonth();

  const [period, setPeriod] = useState<PeriodSelection>('all');
  const [panelOpen, setPanelOpen] = useState(false);
  const [draft, setDraft] = useState<number>(currentMonth);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [restocks, setRestocks] = useState<RestockWithProduct[]>([]);

  const load = useCallback(async () => {
    setRestocks(await listRestocks());
  }, []);

  useFocusEffect(useCallback(() => {
    void load();
  }, [load]));

  const visibleRestocks = useMemo(() => {
    if (period === 'all') return restocks;
    return restocks.filter((restock) => {
      const parsed = parseStoredDate(restock.created_at);
      return !Number.isNaN(parsed.getTime()) && parsed.getMonth() === period;
    });
  }, [period, restocks]);

  const shownRestocks = useMemo(
    () => visibleRestocks.slice(0, visibleCount),
    [visibleRestocks, visibleCount]
  );
  const hasMore = visibleCount < visibleRestocks.length;

  function confirmarEliminar(restock: RestockWithProduct) {
    Alert.alert(
      'Eliminar surtido',
      `¿Estás seguro de eliminar este surtido de "${restock.product_name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteRestock(restock.id);
            await load();
          },
        },
      ]
    );
  }

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
              label="Registrar nuevo surtido"
              onPress={() => router.push('/surtido/nuevo')}
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

          {/* Registros */}
          <View className="w-full gap-3 pt-1 pb-2">
            <View className="flex-row items-baseline justify-between pb-0.5 pt-1">
              <View className="flex-row items-center gap-1.5">
                <ICONS.history size={15} color={colors.primary} weight="bold" />
                <Text
                  className="text-sm font-semibold text-on-surface-variant"
                  style={{ letterSpacing: 0.8 }}
                >
                  REGISTROS
                </Text>
              </View>
              <Text
                className="text-sm text-on-surface-variant"
                style={{ color: colors.onSurfaceVariant }}
              >
                Mostrando {shownRestocks.length} de {visibleRestocks.length}
              </Text>
            </View>

            {shownRestocks.map((restock) => (
              <RestockCard
                key={restock.id}
                dateLabel={formatDateTimeLabel(restock.created_at)}
                productName={restock.product_name}
                productSku={restock.sku}
                imageUri={restock.image_uri}
                quantity={restock.quantity}
                description={restock.description}
                stockAfter={restock.stock_after}
                unitsLabel={`+${restock.quantity} uds`}
                stockLabel="Stock resultante:"
                editLabel="Editar surtido"
                deleteLabel="Eliminar surtido"
                onEdit={() => router.push({ pathname: '/surtido/[id]/editar', params: { id: restock.id } })}
                onDelete={() => confirmarEliminar(restock)}
              />
            ))}

            {shownRestocks.length === 0 ? (
              <View className="w-full items-center rounded-xl bg-surface-container px-4 py-8">
                <Text className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                  Sin surtidos para el periodo seleccionado
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