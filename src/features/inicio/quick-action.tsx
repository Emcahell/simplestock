import { Pressable, Text, View } from 'react-native';

import { ICONS, TONE_COLOR } from '@/features/inicio/icon-map';
import type { IconName, QuickActionVariant, Tone } from '@/features/inicio/types';

type QuickActionProps = {
  label: string;
  icon: IconName;
  tone: Tone;
  variant: QuickActionVariant;
  onPress?: () => void;
};

const ON_PRIMARY = '#09090b';
const ON_SURFACE = '#fafafa';

export function QuickAction({
  label,
  icon,
  tone,
  variant,
  onPress,
}: QuickActionProps) {
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
          isPrimary ? 'bg-on-primary/10' : 'bg-surface-container-high'
        }`}
      >
        <IconComponent
          size={20}
          weight={isPrimary ? 'fill' : 'regular'}
          color={isPrimary ? ON_PRIMARY : TONE_COLOR[tone]}
        />
      </View>

      <Text
        className="text-center text-sm font-semibold"
        style={{
          letterSpacing: -0.2,
          color: isPrimary ? ON_PRIMARY : ON_SURFACE,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}