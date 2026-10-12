import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, Text, TextInput, View, type TextStyle } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';

import { getRestockById, updateRestock } from '@/db/restocks';
import { ICONS } from '@/features/surtidos/icon-map';
import { useThemePreference } from '@/theme/theme-provider';
import { toPriceDigits } from '@/utils/price-input';
import { useKeyboardHeight } from '@/utils/use-keyboard-height';

const WEB_INPUT_NO_OUTLINE = { outlineStyle: 'none' } as unknown as TextStyle;

type RestockData = NonNullable<Awaited<ReturnType<typeof getRestockById>>>;

export default function SurtidoEditarScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useThemePreference();
  const keyboardHeight = useKeyboardHeight();
  const [restock, setRestock] = useState<RestockData | null>(null);
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    async function run() {
      if (!id) return;
      const data = await getRestockById(id as string);
      if (alive && data) {
        setRestock(data);
        setQuantity(String(data.quantity));
        setDescription(data.description);
      }
    }
    void run();
    return () => {
      alive = false;
    };
  }, [id]);

  const quantityNumber = Number(quantity);
  const isValid = quantityNumber > 0 && description.trim().length > 0;

  function onQuantityChange(text: string) {
    setQuantity(toPriceDigits(text));
  }

  async function save() {
    if (!id || !(quantityNumber > 0) || !description.trim()) return;
    setSaving(true);
    try {
      await updateRestock(id as string, {
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
          {/* Producto (solo lectura) */}
          {restock ? (
            <View className="flex-row items-center gap-3 rounded-xl bg-surface-container p-3">
              <View className="h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-container-high">
                {restock.image_uri ? (
                  <Image
                    source={{ uri: restock.image_uri }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                    transition={150}
                  />
                ) : (
                  <ICONS.package size={26} color={colors.onSurfaceVariant} weight="bold" />
                )}
              </View>
              <View className="min-w-0 flex-1">
                <Text numberOfLines={1} className="text-base font-semibold text-on-surface">
                  {restock.product_name}
                </Text>
                {restock.sku ? (
                  <Text numberOfLines={1} className="text-sm text-on-surface-variant">
                    SKU: {restock.sku.toUpperCase()}
                  </Text>
                ) : null}
              </View>
            </View>
          ) : null}

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
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}