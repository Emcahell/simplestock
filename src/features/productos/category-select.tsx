import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

import { ICONS } from '@/features/productos/icon-map';
import { useThemePreference } from '@/theme/theme-provider';

export type CategoryOption = { id: string; name: string };

type CategorySelectProps = {
  categories: CategoryOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreatePress: () => void;
};

export function CategorySelect({
  categories,
  selectedId,
  onSelect,
  onCreatePress,
}: CategorySelectProps) {
  const { colors } = useThemePreference();
  const [open, setOpen] = useState(false);
  const selected = categories.find((c) => c.id === selectedId) ?? null;

  return (
    <>
      <View className="flex-row gap-2">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Seleccionar categoría"
          onPress={() => setOpen(true)}
          className="flex-1 flex-row items-center justify-between rounded-xl bg-surface-container px-3 py-3"
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        >
          <Text
            numberOfLines={1}
            className={selected ? 'text-base text-on-surface' : 'text-base text-on-surface-variant'}
          >
            {selected ? selected.name : 'Seleccionar categoría'}
          </Text>
          <ICONS.caretDown size={18} color={colors.onSurfaceVariant} weight="bold" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Agregar categoría"
          onPress={onCreatePress}
          className="items-center justify-center rounded-xl bg-surface-container-high px-3"
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        >
          <ICONS.plus size={20} color={colors.primary} />
        </Pressable>
      </View>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable className="flex-1 items-center justify-center bg-black/60 p-4" onPress={() => setOpen(false)}>
          <Pressable className="w-full max-w-sm rounded-xl bg-surface-container p-2" onPress={(e) => e.stopPropagation()}>
            <Text className="px-2 pb-2 pt-1 text-base font-semibold text-on-surface">
              Elegir categoría
            </Text>
            <ScrollView className="max-h-80">
              {categories.map((c) => (
                <Pressable
                  key={c.id}
                  accessibilityRole="button"
                  onPress={() => {
                    onSelect(c.id);
                    setOpen(false);
                  }}
                  className="flex-row items-center justify-between rounded-lg px-3 py-3"
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <Text className="text-base text-on-surface">{c.name}</Text>
                  {selectedId === c.id ? (
                    <ICONS.check size={18} color={colors.primary} weight="bold" />
                  ) : null}
                </Pressable>
              ))}
              {categories.length === 0 ? (
                <Text className="px-3 py-3 text-on-surface-variant">Sin categorías</Text>
              ) : null}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
