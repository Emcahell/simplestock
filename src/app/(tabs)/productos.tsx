import { useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type TextStyle,
} from 'react-native';

import { AppHeader } from '@/components/app-header';
import { PrimaryActionButton } from '@/components/primary-action-button';
import productosData from '@/data/productos.json';
import { CategoryFilter } from '@/features/productos/category-filter';
import { ICONS } from '@/features/productos/icon-map';
import { ProductCard } from '@/features/productos/product-card';
import type { ProductosData, ViewMode } from '@/features/productos/types';
import { ViewSwitcher } from '@/features/productos/view-switcher';
import { useThemePreference } from '@/theme/theme-provider';

const MODULE_NAME = 'Productos';

const data = productosData as ProductosData;

const WEB_INPUT_NO_OUTLINE = { outlineStyle: 'none' } as unknown as TextStyle;

export default function ProductosScreen() {
  const { colors } = useThemePreference();
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<ViewMode>('list');

  const categoryLabels = useMemo(
    () => new Map(data.categories.map((entry) => [entry.id, entry.label])),
    []
  );

  const visibleProducts = useMemo(() => {
    const term = query.trim().toLowerCase();

    return data.products.items.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesSearch =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  return (
    <View className="flex-1 bg-surface">
      <AppHeader moduleName={MODULE_NAME} appName={data.appName} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-4">
          {/* Acción principal */}
          <View className="w-full pt-1">
            <PrimaryActionButton label={data.action.label} />
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
                placeholder={data.search.placeholder}
                placeholderTextColor={colors.onSurfaceVariant}
                className="h-full flex-1 px-2.5 text-base text-on-surface"
                style={Platform.OS === 'web' ? WEB_INPUT_NO_OUTLINE : undefined}
                autoCorrect={false}
                returnKeyType="search"
                accessibilityLabel={data.search.placeholder}
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
              categories={data.categories}
              selected={category}
              onSelect={setCategory}
            />
            <View style={{ flexShrink: 0 }}>
              <ViewSwitcher
                mode={mode}
                labels={data.view}
                onChange={setMode}
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
                {data.summary.title.toUpperCase()}
              </Text>
              <Text
                className="text-lg font-bold text-on-surface"
                style={{ letterSpacing: -0.3 }}
              >
                {visibleProducts.length}
              </Text>
            </View>

            <Text
              className="text-sm font-medium"
              style={{ color: colors.onSurfaceVariant }}
            >
              {data.summary.caption}
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
                    sku={product.sku}
                    categoryLabel={categoryLabels.get(product.category) ?? ''}
                    price={product.price}
                    stock={product.stock}
                    currency={data.products.currency}
                    stockTemplate={data.products.stockTemplate}
                    detailHint={data.products.detailHint}
                    editLabel={data.products.editLabel}
                    deleteLabel={data.products.deleteLabel}
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
                {data.empty.title}
              </Text>
              <Text
                className="mt-1 text-center text-sm text-on-surface-variant"
                style={{ maxWidth: 220 }}
              >
                {data.empty.description}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}