import { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';

import { deleteSale, getSaleById, type SaleWithItems } from '@/db/sales';
import { ICONS } from '@/features/ventas/icon-map';
import { useThemePreference } from '@/theme/theme-provider';
import { formatDateTimeLabel, formatUSDPrice } from '@/utils/format';

export default function VentaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useThemePreference();
  const [sale, setSale] = useState<SaleWithItems | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    setSale(await getSaleById(id as string));
  }, [id]);

  useFocusEffect(useCallback(() => {
    void load();
  }, [load]));

  function confirmarEliminar() {
    if (!id) return;
    Alert.alert('Eliminar venta', '¿Estás seguro de eliminar esta venta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await deleteSale(id as string);
          router.back();
        },
      },
    ]);
  }

  return (
    <View className="flex-1 bg-surface">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4">
          {/* Encabezado de la nota */}
          <View className="rounded-xl bg-surface-container p-4">
            <View className="flex-row items-center gap-2">
              <ICONS.scroll size={18} color={colors.primary} weight="bold" />
              <Text
                className="text-sm font-semibold"
                style={{ color: colors.primary, letterSpacing: -0.2 }}
              >
                {sale?.code ?? ''}
              </Text>
            </View>
            <Text className="mt-1 text-sm text-on-surface-variant">
              {sale ? formatDateTimeLabel(sale.created_at) : ''}
            </Text>
          </View>

          {/* Detalle de productos */}
          <View className="overflow-hidden rounded-xl bg-surface-container">
            <View className="px-3.5 pb-1.5 pt-3">
              <Text
                className="text-sm font-semibold text-on-surface-variant"
                style={{ letterSpacing: 0.8 }}
              >
                PRODUCTOS
              </Text>
            </View>

            {sale?.items.map((item, index) => (
              <View key={item.id}>
                {index > 0 ? (
                  <View className="mx-3.5 h-px bg-surface-container-high" />
                ) : null}
                <View className="flex-row items-center gap-3 px-3.5 py-3">
                  <View className="h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-container-high">
                    {item.image_uri ? (
                      <Image
                        source={{ uri: item.image_uri }}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                        transition={150}
                      />
                    ) : (
                      <ICONS.package size={22} color={colors.onSurfaceVariant} weight="bold" />
                    )}
                  </View>
                  <View className="min-w-0 flex-1">
                    <Text numberOfLines={1} className="text-sm font-semibold text-on-surface">
                      {item.product_name}
                    </Text>
                    {item.sku ? (
                      <Text numberOfLines={1} className="text-xs text-on-surface-variant">
                        SKU: {item.sku.toUpperCase()}
                      </Text>
                    ) : null}
                    <Text className="mt-0.5 text-xs text-on-surface-variant">
                      {item.quantity} x {formatUSDPrice(item.unit_price)} USD
                    </Text>
                  </View>
                  <Text className="text-base font-bold text-on-surface">
                    {formatUSDPrice(item.quantity * item.unit_price)}
                  </Text>
                </View>
              </View>
            ))}

            {sale && sale.items.length === 0 ? (
              <View className="px-3.5 py-6">
                <Text className="text-sm text-on-surface-variant">
                  Esta venta no tiene productos.
                </Text>
              </View>
            ) : null}
          </View>

          {/* Total */}
          <View className="flex-row items-baseline justify-between rounded-xl bg-surface-container p-4">
            <Text
              className="text-sm font-semibold text-on-surface-variant"
              style={{ letterSpacing: 0.8 }}
            >
              TOTAL
            </Text>
            <View className="flex-row items-baseline gap-1.5">
              <Text className="text-2xl font-bold text-on-surface" style={{ letterSpacing: -0.4 }}>
                {formatUSDPrice(sale?.total ?? 0)}
              </Text>
              <Text className="text-sm font-medium" style={{ color: colors.success }}>
                USD
              </Text>
            </View>
          </View>

          {/* Acciones */}
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => router.push({ pathname: '/venta/[id]/editar', params: { id: id as string } })}
              accessibilityRole="button"
              accessibilityLabel="Editar venta"
              className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-surface-container-high py-3"
              style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
            >
              <ICONS.edit size={18} color={colors.onSurface} weight="bold" />
              <Text className="font-medium text-on-surface">Editar</Text>
            </Pressable>
            <Pressable
              onPress={confirmarEliminar}
              accessibilityRole="button"
              accessibilityLabel="Eliminar venta"
              className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-red-600 py-3"
              style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
            >
              <ICONS.delete size={18} color="#fff" weight="bold" />
              <Text className="font-semibold text-white">Eliminar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}