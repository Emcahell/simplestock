import { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type TextStyle,
} from 'react-native';
import { Image } from 'expo-image';

import logo from '@/assets/simplestock-logo.png';
import { useUser } from '@/features/user/user-provider';
import { useThemePreference } from '@/theme/theme-provider';
import { useKeyboardHeight } from '@/utils/use-keyboard-height';

const WEB_INPUT_NO_OUTLINE = { outlineStyle: 'none' } as unknown as TextStyle;

export default function BienvenidaScreen() {
  const { colors } = useThemePreference();
  const { saveName } = useUser();
  const keyboardHeight = useKeyboardHeight();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  const trimmed = name.trim();
  const canStart = trimmed.length > 0 && !saving;

  async function start() {
    if (!canStart) return;
    setSaving(true);
    try {
      await saveName(trimmed);
    } finally {
      setSaving(false);
    }
  }

  return (
    <View className="flex-1 bg-surface">
      <ScrollView
        className="flex-1"
        style={keyboardHeight > 0 ? { marginBottom: keyboardHeight } : undefined}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 24,
          paddingBottom: keyboardHeight,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center">
          <Image
            source={logo}
            alt="SimpleStock logo"
            style={{ height: 96, width: 96 }}
            contentFit="contain"
          />

          <Text
            className="mt-5 text-2xl font-semibold text-on-surface"
            style={{ letterSpacing: -0.3 }}
          >
            Bienvenido a SimpleStock
          </Text>
          <Text className="mt-1.5 text-center text-sm text-on-surface-variant">
            ¿Cómo te llamas? Lo usaremos para saludarte.
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            onSubmitEditing={() => void start()}
            placeholder="Tu nombre"
            placeholderTextColor={colors.onSurfaceVariant}
            autoFocus
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            className="mt-6 w-full rounded-xl bg-surface-container px-4 py-3 text-center text-base text-on-surface"
            style={Platform.OS === 'web' ? WEB_INPUT_NO_OUTLINE : undefined}
            accessibilityLabel="Tu nombre"
          />

          <Pressable
            disabled={!canStart}
            onPress={() => void start()}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canStart }}
            className="mt-4 h-11 w-full items-center justify-center rounded-xl bg-primary"
            style={({ pressed }) => [
              { opacity: !canStart ? 0.5 : pressed ? 0.9 : 1 },
            ]}
          >
            <Text className="text-base font-semibold text-on-primary">
              {saving ? 'Guardando...' : 'Comenzar'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
