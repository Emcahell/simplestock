import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  type TextStyle,
} from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';

import { AppHeader } from '@/components/app-header';
import { PrimaryActionButton } from '@/components/primary-action-button';
import { CategoryFilter } from '@/features/productos/category-filter';
import { ICONS } from '@/features/productos/icon-map';
import { ProductCard } from '@/features/productos/product-card';
import type { ViewMode } from '@/features/productos/types';
import { ViewSwitcher } from '@/features/productos/view-switcher';
import { useThemePreference } from '@/theme/theme-provider';
import { deleteProduct, listCategories, listProducts, type ProductWithCategory } from '@/db/products';
import { getSetting, setSetting } from '@/db/settings';
import { formatUSDPrice } from '@/utils/format';

const MODULE_NAME = 'Productos';
const VIEW_MODE_KEY = 'productos_view_mode';
const WEB_INPUT_NO_OUTLINE = { outlineStyle: 'none' } as unknown as TextStyle;

export default function ProductosScreen() {
  const { colors } = useThemePreference();
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<ViewMode>('list');
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    let alive = true;
    getSetting(VIEW_MODE_KEY).then((stored) => {
      if (alive && (stored === 'list' || stored === 'grid')) {
        setMode(stored);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const changeMode = useCallback((next: ViewMode) => {
    setMode(next);
    void setSetting(VIEW_MODE_KEY, next);
  }, []);

  useFocusEffect(useCallback(() => {
    void load();
  }, [load]));

  async function load() {
    const [prods, cats] = await Promise.all([listProducts(), listCategories()]);
    setProducts(prods);
    setCategories([{ id: 'all', label: 'Todos' }, ...cats.map(c=>({ id: c.id, label: c.name }))]);
  }

  const categoryLabels = useMemo(() => new Map(categories.map(c=>[c.id, c.label])), [categories]);

  const visibleProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category_id === category;
      const matchesSearch =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        (product.sku ?? '').toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [category, query, products]);

  function eliminar(id: string) {
    Alert.alert('Eliminar producto', '¿Estás seguro de eliminar este producto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => { await deleteProduct(id); await load(); }}
    ]);
  }

  return (
    <View className="flex-1 bg-surface">
      <AppHeader moduleName={MODULE_NAME} appName="SimpleStock" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-4">
          {/* Acción principal */}
          <View className="w-full pt-1">
            <PrimaryActionButton label="Nuevo producto" onPress={() => router.push('/producto/nuevo')} />
          </View>

          {/* Búsqueda */}
          <View className="w-full">
            <View
              className="w-full flex-row items-center rounded-xl bg-surface-container pl-3.5 pr-3"
              style={{ height: 44 }}
            >
              <ICONS.search size={20} color={colors.onSurfaceVariant} />

              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Buscar por nombre o SKU"
                placeholderTextColor={colors.onSurfaceVariant}
                className="h-full flex-1 px-2.5 text-base text-on-surface"
                style={Platform.OS === 'web' ? WEB_INPUT_NO_OUTLINE : undefined}
                autoCorrect={false}
                returnKeyType="search"
                accessibilityLabel="Buscar por nombre o SKU"
              />

              {query.length > 0 ? (
                <Pressable
                  onPress={() => setQuery('')}
                  accessibilityRole="button"
                  accessibilityLabel="Limpiar búsqueda"
                  hitSlop={8}
                >
                  <ICONS.clear size={18} color={colors.onSurfaceVariant} />
                </Pressable>
              ) : null}
            </View>
          </View>

          {/* Categorías + cambio de vista */}
          <View className="w-full flex-row items-center gap-2">
            <CategoryFilter
              categories={categories}
              selected={category}
              onSelect={setCategory}
            />
            <View style={{ flexShrink: 0 }}>
              <ViewSwitcher
                mode={mode}
                labels={{ list: 'Lista', grid: 'Cuadrícula' }}
                onChange={changeMode}
              />
            </View>
          </View>

          {/* Resumen */}
          <View className="w-full flex-row items-baseline justify-between pb-0.5 pt-1">
            <View className="flex-row items-baseline gap-1.5">
              <Text
                className="text-sm font-semibold text-on-surface-variant"
                style={{ letterSpacing: 0.8 }}
              >
                PRODUCTOS
              </Text>
              <Text
                className="text-lg font-bold text-on-surface"
                style={{ letterSpacing: -0.3 }}
              >
                {products.length}
              </Text>
            </View>

            <Text
              className="text-sm font-medium"
              style={{ color: colors.onSurfaceVariant }}
            >
              Mostrando {visibleProducts.length}
            </Text>
          </View>

          {/* Listado */}
          {visibleProducts.length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                rowGap: 12,
              }}
            >
              {visibleProducts.map((product) => (
                <View
                  key={product.id}
                  style={{ width: mode === 'grid' ? '48%' : '100%' }}
                >
                  <ProductCard
                    mode={mode}
                    name={product.name}
                    sku={product.sku ?? ''}
                    categoryLabel={categoryLabels.get(product.category_id ?? 'all') ?? (product.category_name ?? '')}
                    price={formatUSDPrice(product.price)}
                    stock={product.stock}
                    currency="USD"
                    imageUri={product.image_uri}
                    stockTemplate="{count} en stock"
                    detailHint="Ver detalles"
                    editLabel="Editar producto"
                    deleteLabel="Eliminar producto"
                    onPress={() => router.push({ pathname: '/producto/[id]', params: { id: product.id } })}
                    onEdit={() => router.push({ pathname: '/producto/[id]/editar', params: { id: product.id } })}
                    onDelete={() => eliminar(product.id)}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View className="w-full items-center justify-center py-12">
              <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-surface-container">
                <ICONS.package
                  size={24}
                  color={colors.onSurfaceVariant}
                  weight="duotone"
                />
              </View>
              <Text className="text-base font-semibold text-on-surface">
                Sin productos aún
              </Text>
              <Text
                className="mt-1 text-center text-sm text-on-surface-variant"
                style={{ maxWidth: 220 }}
              >
                Agrega tu primer producto con el botón &quot;Nuevo producto&quot;
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
