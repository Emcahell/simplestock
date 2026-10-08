/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{tsx,jsx,js,ts}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // Tipografía sin definir todavía: se usa la del sistema.
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
        rounded: ["SF Pro Rounded", "Hiragino Maru Gothic ProN", "Meiryo", "MS PGothic", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      // Paleta semántica resuelta en runtime con NativeWind `vars()` (ver
      // src/theme/theme-provider.tsx): cada token es un CSS custom property
      // `--color-<token>` que cambia con el tema claro/oscuro.
      colors: {
        background: "var(--color-background)",
        "on-background": "var(--color-onBackground)",
        "on-surface": "var(--color-onSurface)",
        "on-surface-variant": "var(--color-onSurfaceVariant)",
        "on-primary": "var(--color-onPrimary)",
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary)",
          container: "var(--color-primary)",
          "on-primary": "var(--color-onPrimary)",
          "on-primary-container": "var(--color-onPrimary)",
          "inverse-primary": "var(--color-primary)",
          fixed: "var(--color-primary)",
          "fixed-dim": "var(--color-primary)",
          "on-fixed": "var(--color-onPrimary)",
          "on-fixed-variant": "var(--color-onPrimary)",
        },
        "primary-soft": "var(--color-primarySoft)",
        "primary-outline": "var(--color-primaryOutline)",
        secondary: {
          DEFAULT: "var(--color-secondary)",
          container: "var(--color-tertiaryContainer)",
          "on-secondary": "var(--color-onSurface)",
          "on-secondary-container": "var(--color-onSurface)",
          fixed: "var(--color-secondary)",
          "fixed-dim": "var(--color-secondary)",
          "on-fixed": "var(--color-onSurface)",
          "on-fixed-variant": "var(--color-onSurfaceVariant)",
        },
        tertiary: {
          DEFAULT: "var(--color-tertiary)",
          container: "var(--color-tertiaryContainer)",
          "on-tertiary": "var(--color-onSurface)",
          "on-tertiary-container": "var(--color-onSurface)",
          fixed: "var(--color-tertiary)",
          "fixed-dim": "var(--color-tertiary)",
          "on-fixed": "var(--color-onSurface)",
          "on-fixed-variant": "var(--color-onSurfaceVariant)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          container: "var(--color-surfaceContainerHigh)",
          "on-error": "var(--color-onSurface)",
          "on-error-container": "var(--color-onSurface)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          container: "var(--color-surfaceContainerHigh)",
        },
        warning: {
          DEFAULT: "var(--color-error)",
          container: "var(--color-surfaceContainerHigh)",
        },
        info: {
          DEFAULT: "var(--color-tertiary)",
          container: "var(--color-tertiaryContainer)",
        },
        outline: {
          DEFAULT: "var(--color-border)",
          variant: "var(--color-surfaceVariant)",
        },
        text: {
          primary: "var(--color-onSurface)",
          secondary: "var(--color-textSecondary)",
          tertiary: "var(--color-muted)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          dim: "var(--color-surfaceDim)",
          bright: "var(--color-surfaceBright)",
          card: "var(--color-surfaceContainer)",
          "container-lowest": "var(--color-surfaceContainerLowest)",
          "container-low": "var(--color-surfaceContainerLow)",
          "container": "var(--color-surfaceContainer)",
          "container-high": "var(--color-surfaceContainerHigh)",
          "container-highest": "var(--color-surfaceContainerHighest)",
          elevated: "var(--color-surfaceContainerHighest)",
          secondary: "var(--color-surfaceContainerHigh)",
          border: "var(--color-border)",
          variant: "var(--color-surfaceVariant)",
          tint: "var(--color-primary)",
          inverse: "var(--color-surfaceContainerHigh)",
          "inverse-on": "var(--color-onSurface)",
        },
      },
      // Escala tipográfica en px (no rem): en nativo `rem` depende de la base
      // del runtime y termina siendo frágil. 11px es el mínimo legible;
      // 16px es el cuerpo estándar.
      fontSize: {
        "2xs": ["11px", { lineHeight: "14px" }],
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "22px" }],
        lg: ["18px", { lineHeight: "24px" }],
        xl: ["20px", { lineHeight: "26px" }],
        "2xl": ["24px", { lineHeight: "30px" }],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      spacing: {
        gutter: "1rem",
        margin: "1rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
      },
    },
  },
  plugins: [],
};
