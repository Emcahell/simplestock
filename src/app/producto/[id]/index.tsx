import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View, Pressable, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

import { AppHeader } from '@/components/app-header';
import { useThemePreference } from '@/theme/theme-provider';
import { deleteProduct, getProductById, type ProductWithCategory } from '@/db/products';
import { formatUSDPrice } from '@/utils/format';
import { ICONS } from '@/features/productos/icon-map';

export default function ProductoDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useThemePreference();
  const [prod, setProd] = useState<ProductWithCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    async function run() {
      if (!id) return;
      setLoading(true);
      const p = await getProductById(id as string);
      setProd(p);
      setLoading(false);
    }
    void run();
  }, [id]));
  async function confirmarEliminar() {
    if (!id) return;
    Alert.alert('Eliminar producto', '¿Estás seguro de eliminar este producto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => {
        await deleteProduct(id as string);
        router.back();
      }}
    ]);
  }

  return (
    <View className="flex-1 bg-surface">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="gap-4">
          <View className="h-56 w-full rounded-xl bg-surface-container overflow-hidden items-center justify-center">
            {prod?.image_uri ? (
              <Image source={{ uri: prod.image_uri }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
            ) : (
              <ICONS.package size={60} color={colors.onSurfaceVariant} />
            )}
          </View>

          <View className="gap-2">
            <Text className="text-xl font-semibold text-on-surface">{prod?.name}</Text>
            {prod?.description ? (
              <Text className="text-sm text-on-surface-variant leading-5">{prod.description}</Text>
            ) : null}
            <View className="flex-row gap-2 flex-wrap mt-2">
              <View className="bg-surface-container px-3 py-1 rounded-full">
                <Text className="text-sm text-on-surface-variant">Categoría: {prod?.category_name || 'Sin categoría'}</Text>
              </View>
              <View className="bg-surface-container px-3 py-1 rounded-full">
                <Text className="text-sm text-on-surface-variant">Precio: {formatUSDPrice(prod?.price||0)}</Text>
              </View>
              {prod?.sku ? (
                <View className="bg-surface-container px-3 py-1 rounded-full">
                  <Text className="text-sm text-on-surface-variant">SKU: {prod.sku}</Text>
                </View>
              ) : null}
              <View className="bg-surface-container px-3 py-1 rounded-full">
                <Text className="text-sm text-on-surface-variant">Stock: {prod?.stock ?? 0}</Text>
              </View>
            </View>
          </View>

          <View className="flex-row gap-2">
            <Pressable onPress={() => router.push({ pathname: '/producto/[id]/editar', params: { id: id as string } })} className="flex-1 bg-surface-container-high py-3 rounded-xl items-center">
              <Text className="text-on-surface font-medium">Editar</Text>
            </Pressable>
            <Pressable onPress={confirmarEliminar} className="flex-1 bg-red-600 py-3 rounded-xl items-center">
              <Text className="text-white font-semibold">Eliminar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}