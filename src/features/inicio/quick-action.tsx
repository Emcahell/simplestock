import { Pressable, Text, View } from 'react-native';

import { ICONS } from '@/features/inicio/icon-map';
import type { IconName, QuickActionVariant, Tone } from '@/features/inicio/types';
import { useThemePreference } from '@/theme/theme-provider';

type QuickActionProps = {
  label: string;
  icon: IconName;
  tone: Tone;
  variant: QuickActionVariant;
  onPress?: () => void;
};

export function QuickAction({
  label,
  icon,
  tone,
  variant,
  onPress,
}: QuickActionProps) {
  const { colors } = useThemePreference();
  const IconComponent = ICONS[icon];
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className={`flex-1 items-center justify-center gap-2 rounded-xl p-3 ${
        isPrimary ? 'bg-primary' : 'bg-surface-container'
      }`}
      style={({ pressed }) => [
        { opacity: pressed ? 0.8 : 1 },
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      <View
        className={`h-9 w-9 items-center justify-center rounded-lg ${
          isPrimary ? 'bg-primary-soft' : 'bg-surface-container-high'
        }`}
      >
        <IconComponent
          size={20}
          weight={isPrimary ? 'fill' : 'regular'}
          color={isPrimary ? colors.onPrimary : colors.toneColor[tone]}
        />
      </View>

      <Text
        className="text-center text-sm font-semibold"
        style={{
          letterSpacing: -0.2,
          color: isPrimary ? colors.onPrimary : colors.onSurface,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}