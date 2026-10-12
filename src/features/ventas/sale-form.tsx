import { useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, Text, TextInput, View, type TextStyle } from 'react-native';
import { Image } from 'expo-image';

import { listProducts, type ProductWithCategory } from '@/db/products';
import { ICONS } from '@/features/ventas/icon-map';
import { useThemePreference } from '@/theme/theme-provider';
import { formatUSDPrice } from '@/utils/format';
import { toPriceDigits } from '@/utils/price-input';
import { useKeyboardHeight } from '@/utils/use-keyboard-height';

const WEB_INPUT_NO_OUTLINE = { outlineStyle: 'none' } as unknown as TextStyle;

export type SaleLine = {
  product_id: string;
  name: string;
  sku: string | null;
  image_uri: string | null;
  unit_price: number;
  quantity: string;
  stock: number;
};

type SaleFormProps = {
  initialLines?: SaleLine[];
  submitLabel: string;
  onSubmit: (
    items: { product_id: string; quantity: number; unit_price: number }[]
  ) => Promise<void>;
};

export function SaleForm({ initialLines, submitLabel, onSubmit }: SaleFormProps) {
  const { colors } = useThemePreference();
  const keyboardHeight = useKeyboardHeight();
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [query, setQuery] = useState('');
  const [lines, setLines] = useState<SaleLine[]>(initialLines ?? []);
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

  const selectedIds = useMemo(
    () => new Set(lines.map((line) => line.product_id)),
    [lines]
  );

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter(
        (product) =>
          !selectedIds.has(product.id) &&
          (product.name.toLowerCase().includes(term) ||
            (product.sku ?? '').toLowerCase().includes(term))
      )
      .slice(0, 8);
  }, [query, products, selectedIds]);

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + (Number(line.quantity) || 0) * line.unit_price, 0),
    [lines]
  );

  const isValid =
    lines.length > 0 &&
    lines.every((line) => {
      const quantity = Number(line.quantity);
      return quantity > 0 && quantity <= line.stock;
    });

  function addProduct(product: ProductWithCategory) {
    setLines((prev) => [
      ...prev,
      {
        product_id: product.id,
        name: product.name,
        sku: product.sku,
        image_uri: product.image_uri,
        unit_price: product.price,
        quantity: '1',
        stock: product.stock,
      },
    ]);
    setQuery('');
  }

  function removeLine(productId: string) {
    setLines((prev) => prev.filter((line) => line.product_id !== productId));
  }

  function updateQuantity(productId: string, text: string) {
    const quantity = toPriceDigits(text);
    setLines((prev) =>
      prev.map((line) => (line.product_id === productId ? { ...line, quantity } : line))
    );
  }

  async function submit() {
    if (!isValid) return;
    setSaving(true);
    try {
      await onSubmit(
        lines.map((line) => ({
          product_id: line.product_id,
          quantity: Number(line.quantity),
          unit_price: line.unit_price,
        }))
      );
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
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4">
          {/* Buscador de producto */}
          <View>
            <Text className="mb-2 text-sm text-on-surface-variant">
              Agregar producto
            </Text>
            <View
              className="w-full flex-row items-center rounded-xl bg-surface-container pl-3.5 pr-3"
              style={{ height: 44 }}
            >
              <ICONS.search size={20} color={colors.onSurfaceVariant} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Nombre del producto"
                placeholderTextColor={colors.onSurfaceVariant}
                className="h-full flex-1 px-2.5 text-base text-on-surface"
                style={Platform.OS === 'web' ? WEB_INPUT_NO_OUTLINE : undefined}
                autoCorrect={false}
                accessibilityLabel="Buscar producto"
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

            {matches.length > 0 ? (
              <View className="mt-2 overflow-hidden rounded-xl bg-surface-container">
                {matches.map((product, index) => (
                  <View key={product.id}>
                    {index > 0 ? (
                      <View className="mx-3.5 h-px bg-surface-container-high" />
                    ) : null}
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Agregar ${product.name}`}
                      onPress={() => addProduct(product)}
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
                        <Text numberOfLines={1} className="text-xs text-on-surface-variant">
                          {formatUSDPrice(product.price)} USD
                        </Text>
                      </View>
                      <ICONS.plus size={18} color={colors.primary} weight="bold" />
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : null}

            {query.trim().length > 0 && matches.length === 0 ? (
              <View className="mt-2 rounded-xl bg-surface-container px-4 py-3">
                <Text className="text-sm text-on-surface-variant">
                  Sin resultados para &quot;{query.trim()}&quot;
                </Text>
              </View>
            ) : null}
          </View>

          {/* Productos seleccionados */}
          <View className="gap-3">
            <Text
              className="text-sm font-semibold text-on-surface-variant"
              style={{ letterSpacing: 0.8 }}
            >
              {`PRODUCTOS (${lines.length})`}
            </Text>

            {lines.map((line) => {
              const quantity = Number(line.quantity) || 0;
              const exceedsStock = quantity > line.stock;
              return (
                <View key={line.product_id} className="gap-2.5 rounded-xl bg-surface-container p-3">
                  <View className="flex-row items-center gap-3">
                    <View className="h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-container-high">
                      {line.image_uri ? (
                        <Image
                          source={{ uri: line.image_uri }}
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
                        {line.name}
                      </Text>
                      <Text numberOfLines={1} className="text-xs text-on-surface-variant">
                        Precio unitario: {formatUSDPrice(line.unit_price)} USD
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => removeLine(line.product_id)}
                      accessibilityRole="button"
                      accessibilityLabel={`Quitar ${line.name}`}
                      className="rounded-md p-1.5"
                      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                    >
                      <ICONS.delete size={18} color={colors.error} />
                    </Pressable>
                  </View>

                  <View className="gap-1.5">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-2">
                        <Text className="text-sm text-on-surface-variant">Cantidad</Text>
                        <TextInput
                          value={line.quantity}
                          onChangeText={(text) => updateQuantity(line.product_id, text)}
                          keyboardType="number-pad"
                          placeholder="0"
                          placeholderTextColor={colors.onSurfaceVariant}
                          className="min-w-[64px] rounded-lg px-3 py-2 text-center text-base text-on-surface"
                          style={[
                            exceedsStock
                              ? { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.error, borderWidth: 1 }
                              : { backgroundColor: colors.surfaceContainerHigh },
                            Platform.OS === 'web' ? WEB_INPUT_NO_OUTLINE : null,
                          ]}
                          accessibilityLabel={`Cantidad de ${line.name}`}
                        />
                      </View>
                      <Text className="text-base font-bold text-on-surface">
                        {formatUSDPrice(quantity * line.unit_price)}
                      </Text>
                    </View>
                    {exceedsStock ? (
                      <Text className="text-xs font-medium" style={{ color: colors.error }}>
                        La cantidad excede el stock disponible ({line.stock})
                      </Text>
                    ) : (
                      <Text className="text-xs text-on-surface-variant">
                        Stock disponible: {line.stock}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}

            {lines.length === 0 ? (
              <View className="items-center rounded-xl bg-surface-container px-4 py-8">
                <ICONS.package size={26} color={colors.onSurfaceVariant} weight="duotone" />
                <Text className="mt-2 text-sm text-on-surface-variant">
                  Busca y agrega los productos vendidos
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
                {formatUSDPrice(total)}
              </Text>
              <Text className="text-sm font-medium" style={{ color: colors.success }}>
                USD
              </Text>
            </View>
          </View>

          <Pressable
            disabled={saving || !isValid}
            onPress={submit}
            accessibilityRole="button"
            accessibilityState={{ disabled: saving || !isValid }}
            className="h-11 items-center justify-center rounded-xl bg-primary"
            style={({ pressed }) => ({
              opacity: saving || !isValid ? 0.5 : pressed ? 0.9 : 1,
            })}
          >
            <Text className="text-base font-semibold text-on-primary">
              {saving ? 'Guardando...' : submitLabel}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}