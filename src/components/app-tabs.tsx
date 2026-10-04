import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";
import {
  HouseIcon,
  PackageIcon,
  ScrollIcon,
  TrayIcon,
} from "phosphor-react-native";

import { Colors } from "@/constants/theme";

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Inicio</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={<HouseIcon size={24} color={colors.text} weight="regular" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="productos">
        <NativeTabs.Trigger.Label>Productos</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={<PackageIcon size={24} color={colors.text} weight="regular" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="ventas">
        <NativeTabs.Trigger.Label>Ventas</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={<ScrollIcon size={24} color={colors.text} weight="regular" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="surtidos">
        <NativeTabs.Trigger.Label>Surtidos</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={<TrayIcon size={24} color={colors.text} weight="regular" />}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
