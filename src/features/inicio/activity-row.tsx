import { Text, View } from 'react-native';

import { ICONS } from '@/features/inicio/icon-map';
import type { IconName, Tone } from '@/features/inicio/types';
import { useThemePreference } from '@/theme/theme-provider';

type ActivityRowProps = {
  icon: IconName;
  tone: Tone;
  title: string;
  subtitle: string;
  value: string;
  time: string;
};

export function ActivityRow({
  icon,
  tone,
  title,
  subtitle,
  value,
  time,
}: ActivityRowProps) {
  const { colors } = useThemePreference();
  const IconComponent = ICONS[icon];
  const valueStyle = colors.toneValueStyle[tone];

  return (
    <View className="flex-row items-center justify-between gap-3 p-3.5">
      <View className="min-w-0 flex-1 flex-row items-center gap-3">
        <View className="h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-high">
          <IconComponent size={18} color={colors.toneColor[tone]} />
        </View>

        <View className="min-w-0 flex-1">
          <Text
            numberOfLines={1}
            className="text-sm font-semibold text-on-surface"
            style={{ letterSpacing: -0.2 }}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            className="text-sm text-on-surface-variant"
          >
            {subtitle}
          </Text>
        </View>
      </View>

      <View className="shrink-0 items-end">
        <Text
          className="text-sm"
          style={{
            color: valueStyle.color,
            fontWeight: valueStyle.bold ? '700' : '600',
            letterSpacing: -0.2,
          }}
        >
          {value}
        </Text>
        <Text className="text-2xs text-on-surface-variant" style={{ fontWeight: '500' }}>
          {time}
        </Text>
      </View>
    </View>
  );
}