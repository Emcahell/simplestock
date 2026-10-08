import { Pressable, Text, View } from 'react-native';

import { ICONS } from '@/features/ventas/icon-map';
import type { PeriodSelection, VentasData } from '@/features/ventas/types';
import { useThemePreference } from '@/theme/theme-provider';

type PeriodFilterProps = {
  data: VentasData['filter'];
  monthNames: VentasData['monthNames'];
  value: PeriodSelection;
  currentMonth: number;
  isOpen: boolean;
  draft: number;
  onSelectAll: () => void;
  onTogglePanel: () => void;
  onDraftChange: (month: number) => void;
  onApply: (month: number) => void;
  onCancel: () => void;
};

function Chip({
  label,
  active,
  onPress,
  withCaret,
  caretUp,
  accessibilityLabel,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  withCaret?: boolean;
  caretUp?: boolean;
  accessibilityLabel: string;
}) {
  const { colors } = useThemePreference();
  const tint = active ? colors.onPrimary : colors.onSurfaceVariant;
  const Caret = caretUp ? ICONS.caretUp : ICONS.caretDown;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={accessibilityLabel}
      className={`flex-row items-center gap-1.5 rounded-full px-3.5 py-1.5 ${
        active ? 'bg-primary' : 'bg-surface-container'
      }`}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
    >
      <Text className="text-sm font-medium" style={{ color: tint }}>
        {label}
      </Text>
      {withCaret ? <Caret size={16} color={tint} weight="bold" /> : null}
    </Pressable>
  );
}

export function PeriodFilter({
  data,
  monthNames,
  value,
  currentMonth,
  isOpen,
  draft,
  onSelectAll,
  onTogglePanel,
  onDraftChange,
  onApply,
  onCancel,
}: PeriodFilterProps) {
  const { colors } = useThemePreference();
  const selectedMonth = value === 'all' ? null : value;
  const monthChipLabel =
    selectedMonth === null ? data.month.label : monthNames[selectedMonth];

  return (
    <View className="w-full">
      <View className="w-full flex-row items-center gap-2 py-0.5">
        <Chip
          label={data.all.label}
          active={selectedMonth === null}
          onPress={onSelectAll}
          accessibilityLabel={data.all.label}
        />
        <Chip
          label={monthChipLabel}
          active={selectedMonth !== null}
          onPress={onTogglePanel}
          withCaret
          caretUp={isOpen}
          accessibilityLabel={monthChipLabel}
        />
      </View>

      {isOpen ? (
        <View className="mt-2 rounded-xl bg-surface-container p-3">
          <Text
            className="text-sm font-semibold text-on-surface-variant"
            style={{ letterSpacing: 0.8 }}
          >
            {data.navigateLabel.toUpperCase()}
          </Text>

          <View className="mt-2.5 flex-row flex-wrap gap-2">
            {monthNames.map((name, index) => {
              const selected = index === draft;
              const isCurrent = index === currentMonth;
              return (
                <Pressable
                  key={name}
                  onPress={() => onDraftChange(index)}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  accessibilityLabel={name}
                  className={`min-w-[30%] flex-1 items-center rounded-lg px-2 py-2 ${
                    selected ? 'bg-primary' : 'bg-surface-container-high'
                  }`}
                  style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                >
                  <Text
                    numberOfLines={1}
                    className="text-sm font-medium"
                    style={{ color: selected ? colors.onPrimary : colors.onSurface }}
                  >
                    {name}
                  </Text>
                  {isCurrent ? (
                    <Text
                      className="text-2xs font-medium"
                      style={{
                        color: selected ? colors.onPrimary : colors.onSurfaceVariant,
                      }}
                    >
                      Actual
                    </Text>
                  ) : null}
                </Pressable>
              );
            })}
          </View>

          <View className="mt-3 flex-row gap-2">
            <Pressable
              onPress={onCancel}
              accessibilityRole="button"
              accessibilityLabel={data.cancelLabel}
              className="flex-1 items-center justify-center rounded-lg bg-surface-container-high py-2.5"
              style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: colors.onSurfaceVariant }}
              >
                {data.cancelLabel}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => onApply(draft)}
              accessibilityRole="button"
              accessibilityLabel={data.applyLabel}
              className="flex-1 items-center justify-center rounded-lg bg-primary py-2.5"
              style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: colors.onPrimary }}
              >
                {data.applyLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}