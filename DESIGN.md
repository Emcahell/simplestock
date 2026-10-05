# Simplestock Design System — Light & Dark (Obsidian)

## 1. Visual Direction & Identity

Simplestock es una plataforma de gestión de inventario, stock, ventas y surtidos de alta precisión y velocidad operativa. Su identidad visual se basa en una estructura limpia, tipografía Geist legible y un acento violeta característico.

El sistema soporta **Modo Claro (Light Mode)** y **Modo Oscuro (Dark Mode)** nativamente, garantizando contraste accesible (WCAG AA/AAA), jerarquía clara y reconocimiento inmediato de estados operativos.

**North Star:** *"Precision in Darkness"* — Interfaz dark de alta precisión, minimalista y funcional. El modo oscuro es el tema principal.

---

## 2. Color Palette & Tokens

### 2.1 Primary Brand Accents

| Token | Light Mode | Dark Mode | Propósito |
|---|---|---|---|
| `primary` | `#7c3aed` (Violet 600) | `#a78bfa` (Violet 400) | Acciones primarias, CTA, selección activa, focus rings |
| `primary-hover` | `#6d28d9` (Violet 700) | `#c4b5fd` (Violet 300) | Estados hover/active |
| `primary-container` | `#ede9fe` (Violet 100) | `#2e1065` (Violet 950) | Fondos suaves para énfasis, badges |
| `on-primary` | `#ffffff` | `#09090b` | Texto/iconos sobre primary sólido |
| `on-primary-container` | `#5b21b6` (Violet 800) | `#ddd6fe` (Violet 200) | Texto/iconos sobre primary-container |
| `inverse-primary` | `#d2bbff` (Violet 300) | `#a78bfa` (Violet 400) | Para elementos sobre superficies invertidas |

### 2.2 Surfaces & Backgrounds

| Token | Light Mode | Dark Mode | Propósito |
|---|---|---|---|
| `background` / `bg-app` | `#f8fafc` (Slate 50) | `#09090b` (True near-black) | Fondo global de la aplicación |
| `surface` | `#fef7ff` | `#0c0c0f` | Superficie base |
| `surface-dim` | `#e0d6ec` | `#0a0a0e` | Superficie atenuada |
| `surface-bright` | `#fef7ff` | `#131318` | Superficie más luminosa |
| `surface-card` / `surface-container` | `#ffffff` | `#16171f` | Tarjetas, contenedores principales |
| `surface-container-lowest` | `#ffffff` | `#09090b` | Nivel más bajo (code blocks, fondos muy planos) |
| `surface-container-low` | `#f9f1ff` | `#0f1017` | Sub-containers |
| `surface-container-high` | `#eee4fa` | `#1f202b` | Menús, dropdowns |
| `surface-container-highest` | `#e8dff4` | `#27272a` (Zinc 800) | Superficies elevadas máximas |
| `surface-elevated` | `#ffffff` | `#222433` | Modales flotantes, overlays |
| `surface-secondary` | `#f1f5f9` (Slate 100) | `#1e1f2b` | Inputs, chips inactivos |
| `surface-border` / `outline-variant` | `#e2e8f0` (Slate 200) | `#27272a` (Zinc 800) | Bordes estructurales, divisores (1px) |
| `surface-variant` | `#e8dff4` | `#2f2f37` | Superficies variantes |
| `surface-tint` | `#732ee4` | `#a78bfa` | Tinte para elevación dinámica |
| `inverse-surface` | `#332e3e` | `#e8e8f0` | Superficie invertida |
| `inverse-on-surface` | `#f6edff` | `#1a1a22` | Texto sobre superficie invertida |
| `outline` | `#7b7487` | `#52525b` (Zinc 600) | Bordes activos/focus |

### 2.3 Typography Colors

| Token | Light Mode | Dark Mode | Propósito |
|---|---|---|---|
| `text-primary` / `on-surface` | `#0f172a` (Slate 900) | `#fafafa` | Títulos, métricas clave, contenido primario |
| `text-secondary` / `on-surface-variant` | `#475569` (Slate 600) | `#a1a1aa` (Zinc 400) | Subtítulos, etiquetas, metadatos |
| `text-tertiary` | `#94a3b8` (Slate 400) | `#71717a` (Zinc 500) | Placeholders, leyendas auxiliares |
| `on-background` | `#1e1928` | `#fafafa` | Texto sobre background |

### 2.4 Semantic & Functional Colors

| Estado | Light - Token | Light - Container | Dark - Token | Dark - Container | Uso |
|---|---|---|---|---|---|
| **Éxito / Normal** | `#059669` (Emerald 600) | `#d1fae5` (Emerald 50) | `#34d399` (Emerald 400) | `#064e3b` (Emerald 950) | Ingresos, surtidos, stock estable |
| **Alerta / Bajo Stock** | `#d97706` (Amber 600) | `#fef3c7` (Amber 50) | `#fbbf24` (Amber 400) | `#78350f` (Amber 950) | Stock bajo, reposición próxima |
| **Peligro / Crítico** | `#dc2626` (Red 600) | `#fee2e2` (Red 50) | `#ef4444` (Red 500) | `#7f1d1d` (Red 950) | Agotado, crítico, errores |
| **Información / Movimientos** | `#0284c7` (Sky 600) | `#e0f2fe` (Sky 50) | `#38bdf8` (Sky 400) | `#0c4a6e` (Sky 950) | Movimientos, sincronización, lotes |

### 2.5 Fixed Colors (State Consistency)

| Token | Light | Dark | Uso |
|---|---|---|---|
| `primary-fixed` | `#eaddff` | `#eaddff` | Superficies con énfasis fijo |
| `primary-fixed-dim` | `#d2bbff` | `#d2bbff` | Variante atenuada |
| `on-primary-fixed` | `#25005a` | `#25005a` | Texto sobre fixed |
| `on-primary-fixed-variant` | `#5a00c6` | `#5a00c6` | Variante de texto |
| `secondary-fixed` | `#dae2fc` | `#dae2fc` | Accentos secundarios fijos |
| `secondary-fixed-dim` | `#bec6e0` | `#bec6e0` | Atenuado |
| `on-secondary-fixed` | `#131b2e` | `#131b2e` | Texto |
| `on-secondary-fixed-variant` | `#3e465b` | `#3e465b` | Variante |
| `tertiary-fixed` | `#cce5ff` | `#cce5ff` | Terciario fijo |
| `tertiary-fixed-dim` | `#92ccff` | `#92ccff` | Atenuado |
| `on-tertiary-fixed` | `#001d31` | `#001d31` | Texto |
| `on-tertiary-fixed-variant` | `#004b73` | `#004b73` | Variante |
| `secondary` | `#565e74` | `#bec6e0` | Secundario |
| `on-secondary` | `#ffffff` | `#272e42` | Texto sobre secundario |
| `secondary-container` | `#d7dff9` | `#3e465b` | Container secundario |
| `on-secondary-container` | `#5a6278` | `#dae2fc` | Texto sobre container |
| `tertiary` | `#003b5c` | `#92ccff` | Terciario |
| `on-tertiary` | `#ffffff` | `#003351` | Texto sobre terciario |
| `tertiary-container` | `#00537f` | `#004b73` | Container terciario |
| `on-tertiary-container` | `#8cc6f8` | `#cce5ff` | Texto sobre container |
| `error` | `#ba1a1a` | `#ef4444` | Errores |
| `on-error` | `#ffffff` | `#7f1d1d` | Texto sobre error |
| `error-container` | `#ffdad6` | `#450a0a` | Container de error |
| `on-error-container` | `#93000a` | `#ffe4e6` | Texto sobre container error |

---

## 3. Typography

**Fuente principal:** Geist — moderna, limpia y developer-friendly. Soporte completo para iOS/Android/Web.

| Nivel | Tamaño (rem/px) | Peso | Line Height | Letter Spacing | Uso |
|---|---|---|---|---|---|
| `headline-lg` | 1.5rem (24px) | 700 | 2rem (32px) | `-0.025em` | H1, métricas hero |
| `headline-lg-mobile` | 1.25rem (20px) | 700 | 1.75rem (28px) | `-0.02em` | H1 móvil |
| `headline-md` | 1.125rem (18px) | 600 | 1.75rem (28px) | 0 | H2, secciones |
| `headline-sm` | 1rem (16px) | 600 | 1.5rem (24px) | 0 | H3, subsecciones |
| `body-lg` | 1rem (16px) | 400 | 1.5rem (24px) | 0 | Texto cuerpo principal |
| `body-md` | 0.875rem (14px) | 400 | 1.25rem (20px) | 0 | Texto cuerpo estándar |
| `body-sm` | 0.75rem (12px) | 400 | 1rem (16px) | 0 | Texto auxiliar, metadata |
| `label-lg` | 0.875rem (14px) | 500 | 1.25rem (20px) | 0 | Botones, labels activos |
| `label-md` | 0.75rem (12px) | 500 | 1rem (16px) | `0.01em` | Badges, chips |
| `label-sm` | 0.6875rem (11px) | 500 | 0.875rem (14px) | `0.02em` | Micro-labels, SKU |

**Regla:** Usar `tracking-tight` en headings para mayor nitidez (-0.02em). Mantener tracking estándar en body.

---

## 4. Spacing, Radius & Elevation

### 4.1 Spacing

| Token | Valor (rem/px) | Uso |
|---|---|---|
| `gutter` / `space-md` | 1rem (16px) | Margen lateral estándar |
| `margin` | 1rem (16px) | Espaciado entre secciones |
| `space-xs` | 0.25rem (4px) | Espaciado interno mínimo, gaps |
| `space-sm` | 0.5rem (8px) | Entre elementos relacionados |
| `space-lg` | 1.5rem (24px) | Separación entre bloques |
| `space-xl` | 2rem (32px) | Espaciado vertical grande |

### 4.2 Border Radius

| Token | Valor | Uso |
|---|---|---|
| `sm` | 0.25rem (4px) | Chips pequeños, inputs compactos |
| `DEFAULT` | 0.5rem (8px) | Controles estándar |
| `md` | 0.75rem (12px) | Cards, modales pequeños |
| `lg` | 1rem (16px) | Cards principales |
| `xl` | 1.5rem (24px) | Botones, sheets |
| `full` | 9999px | Pills, badges circulares |

### 4.3 Elevation & Separación

- **Modo Oscuro (Principal):** Sin sombras decorativas. Usar **bordes** (`border border-outline-variant`) para separación. Superficies apiladas con incrementos sutiles de zinc.
- **Modo Claro:** Sombras muy sutiles (`shadow-sm`) para dar elevación natural sin romper limpieza.
- **Focus Rings:** `2px solid primary` (#a78bfa dark / #7c3aed light) con `outline-offset: 2px`. Siempre visible y accesible.
- **Estados activos/hover:** Shift sutil hacia siguiente tier de superficie.

---

## 5. Component Guidelines

| Componente | Light Mode | Dark Mode | Notas |
|---|---|---|---|
| **Top App Bar** | `bg-white border-b border-slate-200` | `bg-surface-card border-b border-outline-variant` | Título `text-primary`, elementos secundarios `text-secondary` |
| **Bottom Navigation** | `bg-white border-t border-slate-200` | `bg-surface-card border-t border-outline-variant` | Activo: `text-primary`, bg `primary-container`. Inactivo: `text-secondary` |
| **Primary Button** | `bg-primary text-on-primary shadow-sm shadow-violet-200 rounded-xl` | `bg-primary text-on-primary rounded-xl` | Hover: `bg-primary-hover`. Sin sombras en dark (precisión). |
| **Secondary Button** | `bg-transparent border border-outline-variant text-primary rounded-xl` | `bg-transparent border border-outline-variant text-primary rounded-xl` | Hover sutil en superficie |
| **Ghost Button** | `text-primary rounded-xl hover:bg-surface-secondary` | `text-primary rounded-xl hover:bg-surface-container-high` | Visible solo/claramente en hover/focus |
| **Cards (Metrics/Inventory)** | `bg-surface-card border border-slate-200/80 shadow-sm rounded-lg` | `bg-surface-card border border-outline-variant rounded-lg` | Sin sombras en dark, bordes para separación |
| **Inputs/Text Fields** | `bg-surface-secondary border border-outline-variant text-primary rounded-lg focus:ring-2 focus:ring-primary focus:outline-none` | `bg-surface-container border border-outline-variant text-primary rounded-lg focus:ring-2 focus:ring-primary focus:outline-none` | Placeholder `text-tertiary` |
| **Chips/Filters** | Inactivo: `bg-surface-secondary text-text-secondary`. Activo: `bg-primary text-on-primary` | Inactivo: `bg-surface-container-high text-text-secondary`. Activo: `bg-primary text-on-primary` | Usar `rounded-full` |
| **Badges/Status** | Éxito: `bg-emerald-50 text-emerald-700 border border-emerald-200`. Alerta: `bg-amber-50 text-amber-700 border border-amber-200`. Peligro: `bg-red-50 text-red-700 border border-red-200`. Info: `bg-sky-50 text-sky-700 border border-sky-200` | Éxito: `bg-emerald-950/60 text-emerald-300 border border-emerald-800/60`. Alerta: `bg-amber-950/60 text-amber-300 border border-amber-800/60`. Peligro: `bg-red-950/60 text-red-300 border border-red-800/60`. Info: `bg-sky-950/60 text-sky-300 border border-sky-800/60` | Usar opacidad sutil en dark para no romper near-black |
| **Code Blocks** | `bg-surface-container-lowest border border-outline-variant rounded-md font-mono` | `bg-surface-container-lowest border border-outline-variant rounded-md font-mono` | Fondo más plano posible |

---

## 6. Design Principles & Rules

- **Dark-first by default:** El modo oscuro es el tema principal (referencia Obsidian High-Contrast). Mantener consistencia con escala zinc-based.
- **Borders over shadows:** Preferir separación por borde (`1px solid outline-variant`). Solo sombras mínimas en Light Mode.
- **Accent por función, nunca decoración:** Usar colores de acento solo para estados funcionales (acción, éxito, alerta, error).
- **Alto contraste siempre:** Cumplir WCAG AA mínimo, priorizando legibilidad operativa.
- **Minimal y preciso:** Interfaz plana, sin ruido visual innecesario.
- **Consistencia entre plataformas:** Usar Geist + tokens unificados para iOS, Android y Web.
- **Estados siempre visibles:** Loading, Empty, Error deben estar claramente diferenciados con sus colores semánticos.
- **NativeWind + Tailwind:** Usar clases utilitarias con estos tokens. Los colores definidos aquí deben mapearse en `tailwind.config.js` para uso con `className`.

---

## 7. Tailwind Mapping Recommendation

Para facilitar su uso con NativeWind, se recomienda mapear estos tokens en `tailwind.config.js` extendiendo `colors`, `fontFamily`, `borderRadius`, `spacing`, etc., siguiendo las convenciones Material 3 adaptadas al diseño Obsidian dual-mode. Usar `dark:` variants para alternancia automática con `className="dark"` o basada en `colorScheme`.

---

## 7.1 Paridad Web ↔ Móvil (obligatorio)

**Web y móvil deben verse idénticos.** El flujo de desarrollo es web en PC + Expo Go en móvil, así que cualquier divergencia visual se detecta tarde.

Reglas:

- Una sola implementación por componente. No crear archivos `.web.tsx` / `.ios.tsx` / `.android.tsx` para resolver diferencias de estilo.
- Nada de posicionamiento dependiente de plataforma dentro de la lógica JS. La única excepción admitida es el `paddingBottom`/`height` de la barra de tabs, que usa `useSafeAreaInsets()` para respetar el home indicator en móvil y cae a un valor fijo en web.
- Cualquier componente que dependa de una API nativa sin equivalente web debe tener un fallback explícito en la misma ruta de código, no en un archivo paralelo.
- Antes de dar por terminado un cambio de UI, validar que compilan **ambas** plataformas (ver §8.3).

---

## 8. Iconografía

**Librería única en toda la app: `phosphor-react-native`.**

| Contexto | Librería |
|---|---|
| Barra de navegación (`src/components/app-tabs.tsx`) | `phosphor-react-native` |
| Pantallas, modales, botones, componentes internos | `phosphor-react-native` |

### 8.1 Por qué `phosphor-react-native` en todas partes

La barra usa `Tabs` de JS (expo-router), **no** `NativeTabs`. Esto es deliberado:

- `NativeTabs` no existe en web. Su fallback (`NativeTabsView.web.js`) renderiza un
  `TabsList` **horizontal** de Radix UI, solo texto y con estilos propios:
  el tab quedaba arriba y visualmente distinto al móvil.
- `NativeTabs` tampoco admite iconos SVG, lo que obligaba a mantener **dos**
  librerías de iconos y dos implementaciones de la barra que divergen con el tiempo.

Con `Tabs` de JS hay **una sola implementación** que corre igual en web y en móvil,
respeta `DESIGN.md` y permite iconos con `weight`/`color` dinámicos.

### 8.2 Reglas

- Importar siempre con sufijo `Icon`: `import { HouseIcon, PackageIcon } from 'phosphor-react-native';`
- `weight` por defecto: `regular`. Usar `fill` para el tab seleccionado, `duotone` para énfasis, `bold` para acciones críticas.
- Los iconos de tab se registran en el mapa `ICONS` de `app-tabs.tsx` y se pintan con `TabIcon`, que aplica `fill` cuando `focused`.
- No introducir `@expo/vector-icons` ni otra librería de iconos.

### 8.3 Verificación

Un cambio en la barra o en iconos es válido si **ambos** exports compilan sin errores:

```bash
npx expo export --platform android
npx expo export --platform web
```
