import { Pressable, Text, View } from 'react-native';

import { ICONS, SURFACE } from '@/features/ventas/icon-map';

type TotalCardProps = {
  label: string;
  amount: string;
  currency: string;
  expanded: boolean;
  onToggle: () => void;
};

export function TotalCard({
  label,
  amount,
  currency,
  expanded,
  onToggle,
}: TotalCardProps) {
  const Caret = expanded ? ICONS.caretUp : ICONS.caretDown;

  return (
    <View className="w-full overflow-hidden rounded-xl bg-surface-container p-4">
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          right: -16,
          bottom: -16,
          height: 96,
          width: 96,
          borderRadius: 48,
          backgroundColor: SURFACE.primary,
          opacity: 0.1,
        }}
      />

      <View className="z-10 flex-row items-start justify-between">
        <View className="flex-1 gap-1">
          <Text
            className="text-sm font-semibold text-on-surface-variant"
            style={{ letterSpacing: 0.8 }}
          >
            {label.toUpperCase()}
          </Text>

          {expanded ? (
            <View className="flex-row items-baseline gap-1.5">
              <Text
                className="text-2xl font-bold text-on-surface"
                style={{ letterSpacing: -0.4 }}
              >
                {amount}
              </Text>
              <Text
                className="text-sm font-medium"
                style={{ color: SURFACE.success }}
              >
                {currency}
              </Text>
            </View>
          ) : null}
        </View>

        <Pressable
          onPress={onToggle}
          accessibilityRole="button"
          accessibilityState={{ expanded }}
          accessibilityLabel={expanded ? `Ocultar ${label.toUpperCase()}` : `Mostrar ${label.toUpperCase()}`}
          className="h-8 w-8 items-center justify-center rounded-full bg-surface-container-high"
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <Caret size={20} color={SURFACE.onSurfaceVariant} weight="bold" />
        </Pressable>
      </View>
    </View>
  );
}