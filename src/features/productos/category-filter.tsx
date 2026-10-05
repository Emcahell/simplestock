import { Pressable, ScrollView, Text } from 'react-native';

import { SURFACE } from '@/features/productos/icon-map';

type CategoryFilterProps = {
  categories: { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
};

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-1"
      contentContainerStyle={{ paddingRight: 8, paddingVertical: 2 }}
    >
      {categories.map((category) => {
        const active = category.id === selected;
        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={category.label}
            className={`mr-2 shrink-0 rounded-full px-3.5 py-1.5 ${
              active ? 'bg-primary' : 'bg-surface-container'
            }`}
            style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
          >
            <Text
              className="text-sm font-medium"
              style={{
                color: active ? SURFACE.onPrimary : SURFACE.onSurfaceVariant,
              }}
            >
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}