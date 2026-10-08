import { Tabs } from 'expo-router';
import { Platform, StyleSheet, type ColorValue } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HouseIcon,
  PackageIcon,
  ScrollIcon,
  TrayIcon,
  type Icon,
} from 'phosphor-react-native';

import { useThemePreference } from '@/theme/theme-provider';

const ICONS: Record<string, Icon> = {
  index: HouseIcon,
  productos: PackageIcon,
  ventas: ScrollIcon,
  surtidos: TrayIcon,
};

type TabIconProps = { color: ColorValue; focused: boolean; size: number };

function TabIcon({ name, color, focused, size }: TabIconProps & { name: string }) {
  const IconComponent = ICONS[name];
  return (
    <IconComponent
      size={size}
      color={color as string}
      weight={focused ? 'fill' : 'regular'}
    />
  );
}

export default function AppTabs() {
  const { colors } = useThemePreference();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: [
          styles.bar,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            paddingBottom: Math.max(insets.bottom, 8),
            height: 56 + Math.max(insets.bottom, 8),
          },
        ],
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.item,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="index" color={color} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="productos"
        options={{
          title: 'Productos',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="productos" color={color} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ventas"
        options={{
          title: 'Ventas',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="ventas" color={color} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="surtidos"
        options={{
          title: 'Surtidos',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="surtidos" color={color} focused={focused} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
    ...Platform.select({
      web: { paddingBottom: 8, height: 56 },
      default: {},
    }),
  },
  item: {
    paddingTop: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.02,
    marginTop: 2,
  },
});
