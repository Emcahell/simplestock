import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import logo from '@/assets/simplestock-logo.png';

type AppHeaderProps = {
  moduleName: string;
  appName?: string;
};

/**
 * Fixed header shared by every screen: brand logo, app name and current module.
 */
export function AppHeader({ moduleName, appName = 'SimpleStock' }: AppHeaderProps) {
  const insets = useSafeAreaInsets();

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
      </View>
    </View>
  );
}