import { Pressable, View } from 'react-native';

import { ICONS } from '@/features/productos/icon-map';
import type { ViewMode } from '@/features/productos/types';
import { useThemePreference } from '@/theme/theme-provider';

type ViewSwitcherProps = {
  mode: ViewMode;
  labels: { list: string; grid: string };
  onChange: (mode: ViewMode) => void;
};

export function ViewSwitcher({ mode, labels, onChange }: ViewSwitcherProps) {
  const { colors } = useThemePreference();
  const options: { mode: ViewMode; label: string }[] = [
    { mode: 'list', label: labels.list },
    { mode: 'grid', label: labels.grid },
  ];

  return (
    <View className="flex-row items-center rounded-xl bg-surface-container-lowest p-1">
      {options.map((option) => {
        const active = option.mode === mode;
        const IconComponent = ICONS[option.mode];

        return (
          <Pressable
            key={option.mode}
            onPress={() => onChange(option.mode)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={option.label}
            className={`items-center justify-center rounded-lg p-1.5 ${
              active ? 'bg-surface-container-high' : ''
            }`}
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            <IconComponent
              size={20}
              color={active ? colors.primary : colors.onSurfaceVariant}
              weight={active ? 'bold' : 'regular'}
            />
          </Pressable>
        );
      })}
    </View>
  );
}