# SimpleStock

App móvil de **inventario, ventas y surtidos** para pequeños negocios (tienda de barrio, abarrotes, miscelánea). Funciona **100% offline**: los datos viven en el dispositivo, sin cuentas ni servidor.

- **Versión:** 1.0.0
- **Plataforma:** Android e iOS (portrait), probada en dispositivo físico con Expo Go
- **Idioma de la interfaz:** español

## Características

- **Bienvenida** — al primer arranque se pide el nombre del usuario (se guarda en la base local) y da paso al resto de la app.
- **Inicio** — métricas reales: productos en stock, ventas de hoy y total del mes; accesos rápidos (nueva venta, nuevo ingreso, nuevo artículo); actividad reciente.
- **Productos** — crear, editar y eliminar productos con categoría, foto, precio, SKU y stock; búsqueda, filtro por categoría y vista lista/grid.
- **Ventas** — registrar ventas con varias líneas (cantidad + precio unitario), códigos `VEN-####`, ajuste automático del stock y validación de stock disponible al editar; detalle y edición de la venta.
- **Surtidos** — registrar ingresos que suman unidades al stock y guardan el stock resultante.
- **Registros** — bitácora real de actividades (productos, ventas, surtidos y sus ediciones).
- **Apariencia** — modo claro/oscuro con tema **claro por defecto**, persistido entre sesiones.

Convenciones de datos:

- Precios en **USD** con formato `1,234.56`.
- Fechas y tiempos en español (helpers en `src/utils/format.ts`).

## Stack

| Capa | Tecnología |
| --- | --- |
| Runtime | Expo SDK 57 · React Native 0.86 · React 19.2 + React Compiler |
| Navegación | Expo Router (rutas tipadas) con `src/app/` como file-based routing |
| Lenguaje | TypeScript 6 |
| Estilos | NativeWind (Tailwind) con tokens del tema |
| Datos | `expo-sqlite` con migraciones versionadas (`PRAGMA user_version`) |
| UI | Phosphor (iconografía única), `expo-image`, `expo-image-picker`, `expo-web-browser` |
| Builds/updates | EAS (`eas build`, `eas submit`, `eas update`) |
| Calidad | ESLint (`eslint-config-expo`), Husky + lint-staged, GitHub Actions |

## Estructura

```
src/
  app/          # rutas (Expo Router)
    (tabs)/     # Inicio, Productos, Ventas, Surtidos
    producto/   # detalle y edición
    venta/      # nueva, detalle y edición
    surtido/    # ingreso y edición
    bienvenida.tsx · registros.tsx
  components/   # header, tabs, menú, botones, filtros
  db/           # conexión, migraciones (v1–v5) y repositorios
  features/     # UI y lógica por módulo (inicio, productos, ventas, surtidos, user)
  theme/        # paletas y provider de tema (claro/oscuro)
  utils/        # formatos, imágenes, nombres de mes, helpers
  data/         # datos estáticos de la UI (labels/iconos), sin datos falsos
```

### Modelo de datos

Migraciones aplicadas en orden al iniciar (`src/db/migrate.ts`):

| Versión | Tablas | Descripción |
| --- | --- | --- |
| v1 | `settings` | clave/valor (nombre de usuario, preferencias) |
| v2 | `categories`, `products` | catálogo con precio, SKU, stock e imagen |
| v3 | `restocks` | surtidos: suman unidades y guardan `stock_after` |
| v4 | `sales`, `sale_items` | ventas con líneas; descuentan del stock |
| v5 | `activities` | bitácora de eventos de la app |

## Datos y privacidad

- **Sin backend**: todo se guarda en SQLite local del dispositivo (`PRAGMA journal_mode = wal`).
- La documentación legal y de soporte vive en la app (menú hamburguesa del header) y en el sitio de la landing:
  - [Política de privacidad](https://emcahell.github.io/simplestock-landing/privacidad/)
  - [Términos y condiciones](https://emcahell.github.io/simplestock-landing/terminos/)
  - [Datos y almacenamiento](https://emcahell.github.io/simplestock-landing/datos/)
  - [Descargo de responsabilidad](https://emcahell.github.io/simplestock-landing/responsabilidad/)
- Desarrollado por [Emcahell](https://emcahell.dev).

## Desarrollo

Requisitos: Node.js 20+ y npm. Usar **npm y npx** (no bun, pnpm ni yarn).

```bash
npm install          # instalar dependencias
npx expo start       # dev server (escanea el QR con Expo Go)
```

Comandos útiles:

```bash
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run android      # desarrollo nativo Android
npm run ios          # desarrollo nativo iOS
npx expo-doctor      # diagnóstico de dependencias/config
npx expo install --fix  # alinear versiones con el SDK
```

Si agregás rutas nuevas, regenerá los tipos de Expo Router arrancando Metro; y después de cambios en `app.json` o `node_modules`, arrancá con `npx expo start -c`.

### Builds y actualizaciones

Usar EAS CLI en la nube (no requiere Xcode/Android Studio):

```bash
npx eas-cli@latest build
npx eas-cli@latest update
npx eas-cli@latest submit
```

### CI

En cada push/PR a `main`, GitHub Actions corre `expo-doctor`, `lint` y `typecheck` (`.github/workflows/ci.yml`).

## Reglas del proyecto

- Sin variantes `.web.tsx`: mismo código para web y móvil.
- Iconografía **Phosphor** en toda la app.
- Estilos con NativeWind usando los tokens del tema (`bg-surface`, `text-on-surface`, etc.).
- `uppercase` se aplica en JavaScript (no CSS) para paridad web ↔ móvil.
- Fechas en SQLite en UTC (`datetime('now')`): parsear y formatear con `src/utils/format.ts`.

## Objetivos

- Control de inventario simple y rápido para un negocio pequeño.
- Funcionar sin internet ni cuentas: la info siempre está en el dispositivo.
- Interfaz clara y mobile-first, con modo oscuro opcional.
- Datos confiables: el stock se mantiene coherente entre productos, ventas y surtidos.
- Código mantenible: TypeScript estricto, migraciones versionadas, lint y CI siempre en verde.

## Licencia

MIT — ver [`LICENSE`](./LICENSE).

## Contacto

- Repositorio: https://github.com/Emcahell/simplestock
- Informar un problema o sugerir una mejora: https://github.com/Emcahell/simplestock/issues
- Sitio: [Landing Page Simplestock](https://emcahell.github.io/simplestock-landing/)
