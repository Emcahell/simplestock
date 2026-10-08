import { Text, View } from 'react-native';

import { ICONS } from '@/features/inicio/icon-map';
import type { IconName, Tone } from '@/features/inicio/types';
import { useThemePreference } from '@/theme/theme-provider';

type MetricCardProps = {
  label: string;
  icon: IconName;
  iconTone: Tone;
  glowTone: Tone;
  children: React.ReactNode;
};

export function MetricCard({
  label,
  icon,
  iconTone,
  glowTone,
  children,
}: MetricCardProps) {
  const { colors } = useThemePreference();
  const IconComponent = ICONS[icon];

  return (
    <View className="relative justify-between overflow-hidden rounded-xl bg-surface-container p-4">
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          right: -16,
          bottom: -16,
          height: 64,
          width: 64,
          borderRadius: 32,
          backgroundColor: colors.toneColor[glowTone],
          opacity: 0.05,
        }}
      />

      <View className="flex-row items-center justify-between">
        <Text
          className="text-sm font-medium text-on-surface-variant"
          style={{ letterSpacing: 0.8 }}
        >
          {label.toUpperCase()}
        </Text>
        <View className="h-7 w-7 items-center justify-center rounded-lg bg-surface-container-high">
          <IconComponent size={18} color={colors.toneColor[iconTone]} />
        </View>
      </View>

      <View className="my-3">{children}</View>
    </View>
  );
}