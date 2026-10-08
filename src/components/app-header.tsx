import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoonIcon, SunIcon } from 'phosphor-react-native';

import logo from '@/assets/simplestock-logo.png';
import { useThemePreference } from '@/theme/theme-provider';

type AppHeaderProps = {
  moduleName: string;
  appName?: string;
};

/**
 * Fixed header shared by every screen: brand logo, app name, current module
 * and the light/dark toggle.
 */
export function AppHeader({ moduleName, appName = 'SimpleStock' }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const { resolved, colors, toggleTheme } = useThemePreference();
  const ThemeToggleIcon = resolved === 'dark' ? SunIcon : MoonIcon;
  const isDark = resolved === 'dark';

  return (
    <View className="w-full bg-surface" style={{ paddingTop: insets.top }}>
      <View className="h-16 flex-row items-center px-4">
        <Image
          source={logo}
          alt="SimpleStock logo"
          style={{ height: 32, width: 32 }}
          contentFit="contain"
        />

        <View className="ml-3 flex-1">
          {/* Uppercased in JS so web and native render identically (DESIGN.md 7.1),
              and `flex-1` so the trailing glyph can never be clipped. */}
          <Text
            numberOfLines={1}
            className="text-sm font-semibold text-primary"
            style={{ letterSpacing: 1.2 }}
          >
            {appName.toUpperCase()}
          </Text>
          <Text
            numberOfLines={1}
            className="text-lg font-semibold text-on-surface"
            style={{ letterSpacing: -0.2 }}
          >
            {moduleName}
          </Text>
        </View>

        <Pressable
          onPress={toggleTheme}
          accessibilityRole="button"
          accessibilityLabel={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <View className="h-9 w-9 items-center justify-center rounded-full bg-surface-container-high">
            <ThemeToggleIcon size={18} color={colors.onSurfaceVariant} weight="regular" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}