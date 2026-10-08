import { Modal, Pressable, Text, View } from 'react-native';

import { ICONS } from '@/features/surtidos/icon-map';
import type { Period, SurtidosData } from '@/features/surtidos/types';
import { useThemePreference } from '@/theme/theme-provider';

type MonthFilterProps = {
  data: SurtidosData['filter'];
  periods: Period[];
  value: string;
  count: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (id: string) => void;
};

export function MonthFilter({
  data,
  periods,
  value,
  count,
  isOpen,
  onOpen,
  onClose,
  onSelect,
}: MonthFilterProps) {
  const { colors } = useThemePreference();
  const selected = periods.find((period) => period.id === value) ?? periods[0];
  const displayLabel = `${selected.label} (${selected.count})`;

  return (
    <>
      <View className="w-full flex-row items-center gap-3 rounded-xl bg-surface-container-low p-2">
        <Pressable
          onPress={onOpen}
          accessibilityRole="button"
          accessibilityLabel={displayLabel}
          accessibilityState={{ expanded: isOpen }}
          className="min-w-0 flex-1 flex-row items-center gap-2 rounded-lg bg-surface-container px-3 py-2"
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
        >
          <ICONS.calendar size={18} color={colors.primary} weight="bold" />
          <Text
            numberOfLines={1}
            className="min-w-0 flex-1 text-sm font-medium"
            style={{ color: colors.onSurface }}
          >
            {displayLabel}
          </Text>
          <ICONS.caretDown size={16} color={colors.onSurfaceVariant} weight="bold" />
        </Pressable>

        <View className="flex-row items-center gap-1.5 rounded-lg bg-surface-container px-3 py-2">
          <View
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: colors.tertiary }}
          />
          <Text
            numberOfLines={1}
            className="text-sm font-semibold"
            style={{ color: colors.tertiary }}
          >
            {count} {data.movementsLabel.toUpperCase()}
          </Text>
        </View>
      </View>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={data.cancelLabel}
          className="flex-1 justify-end p-4"
          style={{ backgroundColor: 'rgba(9, 9, 11, 0.85)' }}
        >
          <Pressable
            onPress={(event) => event.stopPropagation()}
            className="w-full gap-1 rounded-xl bg-surface-container-high p-3"
          >
            <Text
              className="mb-1 text-sm font-semibold text-on-surface-variant"
              style={{ letterSpacing: 0.8 }}
            >
              {data.navigateLabel.toUpperCase()}
            </Text>

            {periods.map((period) => {
              const isSelected = period.id === selected.id;
              return (
                <Pressable
                  key={period.id}
                  onPress={() => onSelect(period.id)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={`${period.label} (${period.count})`}
                  className="flex-row items-center justify-between rounded-lg px-3 py-2.5"
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.8 : 1,
                    backgroundColor: isSelected ? colors.tertiaryContainer : 'transparent',
                  })}
                >
                  <Text
                    className="text-sm font-medium"
                    style={{
                      color: isSelected
                        ? colors.tertiary
                        : colors.onSurfaceVariant,
                    }}
                  >
                    {period.label}
                  </Text>
                  <Text
                    className="text-sm font-semibold"
                    style={{
                      color: isSelected
                        ? colors.tertiary
                        : colors.onSurfaceVariant,
                    }}
                  >
                    ({period.count})
                  </Text>
                </Pressable>
              );
            })}

            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={data.cancelLabel}
              className="mt-2 items-center justify-center rounded-lg bg-surface-container py-2.5"
              style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: colors.onSurfaceVariant }}
              >
                {data.cancelLabel}
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}