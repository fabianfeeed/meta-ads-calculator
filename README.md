# Meta-Ads Budget & KPI Calculator

Una aplicación web moderna y completa para calcular inversión publicitaria necesaria en Meta (Facebook/Instagram) Ads, ROAS objetivo y monitorear KPIs operativos.

## 🚀 Características Principales

### Calculadora de Inversión Publicitaria
- **Cálculo automático** de inversión necesaria basado en objetivos de venta
- **ROAS objetivo** con indicadores visuales de rendimiento
- **Validación en tiempo real** de inputs con mensajes de error claros
- **Tooltips informativos** para cada métrica

### Panel de KPIs Editables
- **Gestión completa de KPIs** operativos (mensajes, conversiones, costes)
- **Cálculo automático** de tasa de conversión
- **Modo de edición** intuitivo con validaciones

### Sistema de Presets
- **Guardado automático** en localStorage
- **Gestión de presets** con nombres personalizados
- **Importación/Exportación** de configuraciones
- **Reset a valores por defecto**

### Exportación de Datos
- **Exportación CSV** para análisis en Excel/Google Sheets
- **Exportación PDF** para reportes y presentaciones
- **Formato profesional** con datos completos

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript (modo strict)
- **Estilos**: TailwindCSS + shadcn/ui
- **Estado**: React Hooks + localStorage
- **Testing**: Vitest + React Testing Library
- **Iconos**: Lucide React
- **Validación**: Validaciones personalizadas

## 📋 Requisitos del Sistema

- Node.js 18.0 o superior
- npm 9.0 o superior
- Navegador moderno con soporte para ES2020+

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd meta-ads-calculator
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### 4. Construir para Producción

```bash
npm run build
npm start
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage
```

### Cobertura de Tests

Los tests cubren:
- ✅ Funciones de cálculo matemático
- ✅ Funciones de formateo y parsing
- ✅ Validaciones de entrada
- ✅ Estados de ROAS

## 📊 Fórmulas de Cálculo

### Cálculos Principales

```typescript
ventasNecesarias = montoVentaObjetivo / ticketPromedio
leadsNecesarios = ventasNecesarias / (tasaConversionLeads / 100)
costoPorCompraObjetivo = ticketPromedio * (porcentajeCAC / 100)
inversionNecesaria = montoVentaObjetivo * (porcentajeCAC / 100)
roasObjetivo = montoVentaObjetivo / inversionNecesaria
```

### KPIs Operativos

```typescript
tasaConversion = (ventasCerradas / mensajesTotales) * 100
costePorMensaje = inversionTotal / mensajesTotales
```

## 🎨 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout global
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes base (shadcn/ui)
│   └── calculator/       # Componentes específicos
│       ├── InputField.tsx
│       ├── ResultTable.tsx
│       ├── KpiCard.tsx
│       ├── PresetManager.tsx
│       └── ExportButtons.tsx
├── hooks/                # Custom hooks
│   ├── useCalculator.ts  # Lógica de cálculos
│   └── useKpiStore.ts    # Gestión de KPIs y localStorage
├── types/                # Definiciones TypeScript
│   └── calculator.ts
├── utils/                # Utilidades
│   ├── calculations.ts   # Funciones de cálculo
│   ├── formatters.ts     # Formateo de números
│   └── exportUtils.ts    # Exportación CSV/PDF
└── test/                 # Configuración de tests
    └── setup.ts
```

## 🔧 Configuración

### Variables de Entorno

No se requieren variables de entorno para el funcionamiento básico.

### Personalización

#### Valores por Defecto

Los valores por defecto se pueden modificar en `src/hooks/useKpiStore.ts`:

```typescript
const DEFAULT_KPI_DATA: KpiData = {
  mensajes: {
    semanal: 87.5,
    mensual: 350,
  },
  costePorMensaje: 1.71,
  // ...
};
```

#### Estilos y Temas

Los colores y estilos se pueden personalizar en:
- `tailwind.config.js` - Configuración de TailwindCSS
- `src/app/globals.css` - Estilos globales

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 **Móviles** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large screens** (1440px+)

## ♿ Accesibilidad

### Características de Accesibilidad

- **Navegación por teclado** completa
- **Labels semánticos** en todos los inputs
- **Contraste AA** en todos los elementos
- **Tooltips descriptivos** para métricas
- **Estados de error** claros y descriptivos
- **Estructura HTML semántica**

### Testing de Accesibilidad

```bash
# Lighthouse CI (requiere configuración adicional)
npm run lighthouse

# Verificación manual recomendada con:
# - Navegación solo con teclado
# - Lectores de pantalla
# - Herramientas de contraste
```

## 🚀 Deploy en Vercel

### Deploy Automático

1. **Conectar repositorio** a Vercel
2. **Configurar proyecto** con las siguientes opciones:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Deploy automático** en cada push a main

### Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Variables de Entorno en Vercel

No se requieren variables de entorno específicas.

## 📈 Performance

### Métricas Objetivo

- **Lighthouse Performance**: ≥ 90
- **Lighthouse Accessibility**: ≥ 90
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Optimizaciones Implementadas

- ✅ **Code splitting** automático con Next.js
- ✅ **Lazy loading** de componentes
- ✅ **Optimización de imágenes** con Next.js Image
- ✅ **Minificación** automática en producción
- ✅ **Tree shaking** para reducir bundle size

## 🔒 Seguridad

### Medidas de Seguridad

- ✅ **Validación de inputs** en cliente y servidor
- ✅ **Sanitización** de datos de usuario
- ✅ **Headers de seguridad** configurados
- ✅ **Dependencias actualizadas** regularmente

### Auditoría de Seguridad

```bash
# Auditar dependencias
npm audit

# Corregir vulnerabilidades automáticamente
npm audit fix
```

## 🐛 Troubleshooting

### Problemas Comunes

#### Error de Build

```bash
# Limpiar cache y reinstalar
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

#### Tests Fallando

```bash
# Verificar configuración de Vitest
npm run test -- --reporter=verbose
```

#### Problemas de Estilo

```bash
# Regenerar estilos de TailwindCSS
npm run build:css
```

### Logs y Debugging

```bash
# Modo debug en desarrollo
DEBUG=* npm run dev

# Verificar bundle analyzer
npm run analyze
```

## 🤝 Contribución

### Guías de Contribución

1. **Fork** el repositorio
2. **Crear rama** para feature: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. **Crear Pull Request**

### Estándares de Código

- **TypeScript strict mode** habilitado
- **ESLint** para linting
- **Prettier** para formateo
- **Conventional Commits** para mensajes

### Testing Requirements

- ✅ **Tests unitarios** para nuevas funciones
- ✅ **Tests de integración** para componentes
- ✅ **Cobertura mínima** del 80%

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Créditos

### Desarrollado por

- **Manus AI** - Desarrollo completo de la aplicación

### Tecnologías Utilizadas

- [Next.js](https://nextjs.org/) - Framework React
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Lucide](https://lucide.dev/) - Iconos
- [Vitest](https://vitest.dev/) - Testing framework

## 📞 Soporte

Para soporte técnico o preguntas:

1. **Revisar documentación** en este README
2. **Buscar en issues** existentes
3. **Crear nuevo issue** con detalles del problema
4. **Incluir información** del entorno y pasos para reproducir

---

**Meta-Ads Budget & KPI Calculator** - Optimiza tu inversión publicitaria con cálculos precisos y KPIs en tiempo real.

