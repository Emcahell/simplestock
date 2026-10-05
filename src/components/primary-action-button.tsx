import { Pressable, Text } from 'react-native';
import { PlusIcon } from 'phosphor-react-native';

type PrimaryActionButtonProps = {
  label: string;
  onPress?: () => void;
};

/**
 * Shared primary CTA. Single source of truth so every "create" action renders
 * the exact same PlusIcon (size and weight included) across screens.
 */
export function PrimaryActionButton({ label, onPress }: PrimaryActionButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="h-11 w-full flex-row items-center justify-center gap-2 rounded-xl bg-primary"
      style={({ pressed }) => [
        { opacity: pressed ? 0.9 : 1 },
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      <PlusIcon size={20} color="#0a0012" weight="bold" />
      <Text className="text-base font-semibold" style={{ color: '#0a0012' }}>
        {label}
      </Text>
    </Pressable>
  );
}