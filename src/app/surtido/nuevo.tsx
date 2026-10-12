import { useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, Text, TextInput, View, type TextStyle } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';

import { createRestock } from '@/db/restocks';
import { listProducts, type ProductWithCategory } from '@/db/products';
import { ICONS } from '@/features/surtidos/icon-map';
import { useThemePreference } from '@/theme/theme-provider';
import { toPriceDigits } from '@/utils/price-input';
import { useKeyboardHeight } from '@/utils/use-keyboard-height';

const WEB_INPUT_NO_OUTLINE = { outlineStyle: 'none' } as unknown as TextStyle;

export default function SurtidoNuevoScreen() {
  const { colors } = useThemePreference();
  const keyboardHeight = useKeyboardHeight();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [selected, setSelected] = useState<ProductWithCategory | null>(null);
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    async function run() {
      const prods = await listProducts();
      if (alive) setProducts(prods);
    }
    void run();
    return () => {
      alive = false;
    };
  }, []);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (term.length === 0) return [];
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          (product.sku ?? '').toLowerCase().includes(term)
      )
      .slice(0, 8);
  }, [query, products]);

  const quantityNumber = Number(quantity);
  const isValid =
    selected !== null && quantityNumber > 0 && description.trim().length > 0;

  function onSearchChange(text: string) {
    setQuery(text);
    setSelected(null);
  }

  function onQuantityChange(text: string) {
    setQuantity(toPriceDigits(text));
  }

  function pickProduct(product: ProductWithCategory) {
    setSelected(product);
    setQuery('');
  }

  async function save() {
    if (!selected || !(quantityNumber > 0) || !description.trim()) return;
    setSaving(true);
    try {
      await createRestock({
        product_id: selected.id,
        quantity: quantityNumber,
        description: description.trim(),
      });
      router.back();
    } finally {
      setSaving(false);
    }
  }

  return (
    <View className="flex-1 bg-surface">
      <ScrollView
        className="flex-1"
        style={keyboardHeight > 0 ? { marginBottom: keyboardHeight } : undefined}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 + keyboardHeight }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-4">
          {/* Búsqueda de producto */}
          <View>
            <Text className="mb-2 text-sm text-on-surface-variant">
              Buscar producto *
            </Text>
            <View
              className="w-full flex-row items-center rounded-xl bg-surface-container pl-3.5 pr-3"
              style={{ height: 44 }}
            >
              <ICONS.search size={20} color={colors.onSurfaceVariant} />
              <TextInput
                value={query}
                onChangeText={onSearchChange}
                placeholder="Nombre del producto"
                placeholderTextColor={colors.onSurfaceVariant}
                className="h-full flex-1 px-2.5 text-base text-on-surface"
                style={Platform.OS === 'web' ? WEB_INPUT_NO_OUTLINE : undefined}
                autoCorrect={false}
                accessibilityLabel="Buscar producto"
              />
              {query.length > 0 ? (
                <Pressable
                  onPress={() => onSearchChange('')}
                  accessibilityRole="button"
                  accessibilityLabel="Limpiar búsqueda"
                  hitSlop={8}
                >
                  <ICONS.clear size={18} color={colors.onSurfaceVariant} />
                </Pressable>
              ) : null}
            </View>

            {selected ? (
              <View className="mt-2 flex-row items-center gap-2 rounded-xl bg-surface-container-high p-2.5">
                <View className="h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-container-lowest">
                  {selected.image_uri ? (
                    <Image
                      source={{ uri: selected.image_uri }}
                      style={{ width: '100%', height: '100%' }}
                      contentFit="cover"
                      transition={150}
                    />
                  ) : (
                    <ICONS.package size={22} color={colors.onSurfaceVariant} weight="bold" />
                  )}
                </View>
                <View className="min-w-0 flex-1">
                  <Text numberOfLines={1} className="text-base font-semibold text-on-surface">
                    {selected.name}
                  </Text>
                  {selected.sku ? (
                    <Text numberOfLines={1} className="text-sm text-on-surface-variant">
                      SKU: {selected.sku.toUpperCase()}
                    </Text>
                  ) : null}
                </View>
                <ICONS.check size={20} color={colors.success} weight="bold" />
                <Pressable
                  onPress={() => setSelected(null)}
                  accessibilityRole="button"
                  accessibilityLabel="Cambiar producto"
                  className="rounded-md p-1.5"
                  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                >
                  <ICONS.clear size={18} color={colors.onSurfaceVariant} />
                </Pressable>
              </View>
            ) : null}

            {matches.length > 0 ? (
              <View className="mt-2 overflow-hidden rounded-xl bg-surface-container">
                {matches.map((product, index) => (
                  <View key={product.id}>
                    {index > 0 ? (
                      <View className="mx-3.5 h-px bg-surface-container-high" />
                    ) : null}
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={product.name}
                      onPress={() => pickProduct(product)}
                      className="flex-row items-center gap-2.5 px-3 py-2.5"
                      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                    >
                      <View className="h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-surface-container-high">
                        {product.image_uri ? (
                          <Image
                            source={{ uri: product.image_uri }}
                            style={{ width: '100%', height: '100%' }}
                            contentFit="cover"
                            transition={150}
                          />
                        ) : (
                          <ICONS.package size={20} color={colors.onSurfaceVariant} weight="bold" />
                        )}
                      </View>
                      <View className="min-w-0 flex-1">
                        <Text numberOfLines={1} className="text-sm font-medium text-on-surface">
                          {product.name}
                        </Text>
                        {product.sku ? (
                          <Text numberOfLines={1} className="text-xs text-on-surface-variant">
                            SKU: {product.sku.toUpperCase()}
                          </Text>
                        ) : null}
                      </View>
                      <ICONS.caretRight
                        size={16}
                        color={colors.onSurfaceVariant}
                        weight="bold"
                      />
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : null}

            {query.trim().length > 0 && matches.length === 0 && selected === null ? (
              <View className="mt-2 rounded-xl bg-surface-container px-4 py-3">
                <Text className="text-sm text-on-surface-variant">
                  Sin resultados para &quot;{query.trim()}&quot;
                </Text>
              </View>
            ) : null}
          </View>

          {/* Cantidad */}
          <View>
            <Text className="mb-2 text-sm text-on-surface-variant">
              Cantidad ingresada *
            </Text>
            <TextInput
              value={quantity}
              onChangeText={onQuantityChange}
              keyboardType="number-pad"
              placeholder="0"
              placeholderTextColor={colors.onSurfaceVariant}
              className="rounded-xl bg-surface-container px-3 py-3 text-base text-on-surface"
              style={Platform.OS === 'web' ? WEB_INPUT_NO_OUTLINE : undefined}
              accessibilityLabel="Cantidad ingresada"
            />
          </View>

          {/* Descripción */}
          <View>
            <Text className="mb-2 text-sm text-on-surface-variant">
              Descripción breve *
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholder="Ej: Reabastecimiento quincenal"
              placeholderTextColor={colors.onSurfaceVariant}
              className="h-20 rounded-xl bg-surface-container px-3 py-3 text-base text-on-surface"
              style={Platform.OS === 'web' ? WEB_INPUT_NO_OUTLINE : undefined}
              accessibilityLabel="Descripción breve"
            />
          </View>

          <Pressable
            disabled={saving || !isValid}
            onPress={save}
            accessibilityRole="button"
            accessibilityState={{ disabled: saving || !isValid }}
            className="mt-2 h-11 items-center justify-center rounded-xl bg-primary"
            style={({ pressed }) => [
              {
                opacity:
                  saving || !isValid ? 0.5 : pressed ? 0.9 : 1,
              },
            ]}
          >
            <Text className="text-base font-semibold text-on-primary">
              {saving ? 'Guardando...' : 'Guardar'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}