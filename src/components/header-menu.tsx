import { useState } from "react";
import { Modal, Pressable, ScrollView, Switch, Text, View } from "react-native";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CaretRightIcon,
  GithubLogoIcon,
  GlobeIcon,
  ListIcon,
  MoonIcon,
  SunIcon,
  WarningCircleIcon,
  type Icon,
} from "phosphor-react-native";

import { useThemePreference } from "@/theme/theme-provider";

const PRIVACY_URL =
  "https://emcahell.github.io/simplestock-landing/privacidad/";
const TERMS_URL = "https://emcahell.github.io/simplestock-landing/terminos/";
const DATA_URL = "https://emcahell.github.io/simplestock-landing/datos/";
const DISCLAIMER_URL =
  "https://emcahell.github.io/simplestock-landing/responsabilidad/";
const GITHUB_URL = "https://github.com/Emcahell/simplestock";
const ISSUES_URL = "https://github.com/Emcahell/simplestock/issues";
const DEVELOPER_URL = "https://emcahell.dev";

const APP_VERSION = Constants.expoConfig?.version ?? "1.0.0";

function openExternal(url: string) {
  void WebBrowser.openBrowserAsync(url);
}

type MenuRowProps = {
  icon: Icon;
  label: string;
  onPress: () => void;
  isLast?: boolean;
};

function MenuRow({
  icon: IconComponent,
  label,
  onPress,
  isLast,
}: MenuRowProps) {
  const { colors } = useThemePreference();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="flex-row items-center gap-3.5 rounded-xl px-3"
      style={({ pressed }) => [
        { height: 56, opacity: pressed ? 0.6 : 1 },
        !isLast ? { marginBottom: 16 } : null,
      ]}
    >
      <IconComponent
        size={18}
        color={colors.onSurfaceVariant}
        weight="regular"
      />
      <Text numberOfLines={1} className="flex-1 text-sm text-on-surface">
        {label}
      </Text>
      <CaretRightIcon size={14} color={colors.onSurfaceVariant} weight="bold" />
    </Pressable>
  );
}

function MenuSectionTitle({ children }: { children: string }) {
  return (
    <Text
      className="px-3 pb-2 pt-3 text-xs font-semibold text-on-surface-variant"
      style={{ letterSpacing: 0.8 }}
    >
      {children.toUpperCase()}
    </Text>
  );
}

function MenuDivider() {
  const { colors } = useThemePreference();
  return (
    <View
      className="mx-3 my-2 h-px"
      style={{ backgroundColor: colors.surfaceContainerHigh }}
    />
  );
}

export function HeaderMenuButton() {
  const { colors, resolved, toggleTheme } = useThemePreference();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const isDark = resolved === "dark";

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel="Abrir menú"
        hitSlop={8}
        style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
      >
        <View className="h-9 w-9 items-center justify-center rounded-full bg-surface-container-high">
          <ListIcon size={18} color={colors.onSurfaceVariant} />
        </View>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          onPress={() => setOpen(false)}
          accessibilityRole="button"
          accessibilityLabel="Cerrar menú"
          className="flex-1 bg-black/40"
        >
          <View
            className="flex-1 items-end"
            style={{
              paddingTop: insets.top + 56,
              paddingLeft: 12,
              paddingRight: 12,
            }}
          >
            <Pressable
              onPress={() => {}}
              accessibilityRole="menu"
              accessibilityLabel="Menú de la aplicación"
              className="w-[320px] max-w-full overflow-hidden rounded-2xl bg-surface-container p-3"
              style={{
                maxHeight: "78%",
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 8 },
                elevation: 8,
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 4, paddingBottom: 12 }}
              >
                {/* Apariencia */}
                <MenuSectionTitle>Apariencia</MenuSectionTitle>
                <View
                  className="flex-row items-center justify-between rounded-xl px-3"
                  style={{ height: 56, marginBottom: 4 }}
                >
                  <View className="flex-row items-center gap-3">
                    {isDark ? (
                      <MoonIcon
                        size={18}
                        color={colors.onSurfaceVariant}
                        weight="regular"
                      />
                    ) : (
                      <SunIcon
                        size={18}
                        color={colors.onSurfaceVariant}
                        weight="regular"
                      />
                    )}
                    <Text className="text-sm text-on-surface">Modo oscuro</Text>
                  </View>
                  <Switch
                    value={isDark}
                    onValueChange={toggleTheme}
                    accessibilityLabel="Modo oscuro"
                    trackColor={{
                      false: colors.surfaceContainerHigh,
                      true: colors.primary,
                    }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <MenuDivider />

                {/* Legal y privacidad */}
                <MenuSectionTitle>Legal y privacidad</MenuSectionTitle>
                <MenuRow
                  icon={GlobeIcon}
                  label="Política de privacidad"
                  onPress={() => openExternal(PRIVACY_URL)}
                />
                <MenuRow
                  icon={GlobeIcon}
                  label="Términos y condiciones"
                  onPress={() => openExternal(TERMS_URL)}
                />
                <MenuRow
                  icon={GlobeIcon}
                  label="Datos y almacenamiento"
                  onPress={() => openExternal(DATA_URL)}
                />
                <MenuRow
                  icon={GlobeIcon}
                  label="Descargo de responsabilidad"
                  onPress={() => openExternal(DISCLAIMER_URL)}
                />

                <MenuDivider />

                {/* Proyecto */}
                <MenuSectionTitle>Proyecto</MenuSectionTitle>
                <MenuRow
                  icon={GithubLogoIcon}
                  label="Ver código en GitHub"
                  onPress={() => openExternal(GITHUB_URL)}
                />
                <MenuRow
                  icon={WarningCircleIcon}
                  label="Informar problema o sugerir mejora"
                  onPress={() => openExternal(ISSUES_URL)}
                  isLast
                />

                <MenuDivider />

                {/* Créditos */}
                <MenuSectionTitle>Información</MenuSectionTitle>
                <View className="px-3 pb-2 pt-1">
                  <Text className="text-xs leading-6 text-on-surface-variant">
                    Desarrollado por{" "}
                    <Text
                      accessibilityRole="link"
                      onPress={() => openExternal(DEVELOPER_URL)}
                      className="text-primary"
                      style={{ fontWeight: "500" }}
                    >
                      Emcahell
                    </Text>{" "}
                    (emcahell.dev)
                  </Text>
                  <Text className="text-xs leading-6 text-on-surface-variant">
                    Versión {APP_VERSION}
                  </Text>
                </View>
              </ScrollView>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
