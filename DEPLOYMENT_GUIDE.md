# Guía Completa de Despliegue en Vercel

## Meta-Ads Budget & KPI Calculator

Esta guía te llevará paso a paso para desplegar tu aplicación Meta-Ads Budget & KPI Calculator en Vercel de forma permanente y gratuita.

## 📋 Requisitos Previos

Antes de comenzar el despliegue, asegúrate de tener:

1. **Cuenta de GitHub** (gratuita)
2. **Cuenta de Vercel** (gratuita)
3. **Navegador web moderno**
4. **El proyecto Meta-Ads Calculator** (ya lo tienes)

## 🚀 Método 1: Despliegue Directo desde Vercel (Recomendado)

### Paso 1: Crear Cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign Up" (Registrarse)
3. Selecciona "Continue with GitHub" para vincular tu cuenta
4. Autoriza a Vercel para acceder a tu GitHub

### Paso 2: Subir el Proyecto a GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón "+" en la esquina superior derecha
3. Selecciona "New repository"
4. Nombra tu repositorio: `meta-ads-calculator`
5. Marca como "Public" (para plan gratuito)
6. Haz clic en "Create repository"

### Paso 3: Subir los Archivos

Tienes dos opciones para subir los archivos:

#### Opción A: Usando la Interfaz Web de GitHub

1. En tu nuevo repositorio, haz clic en "uploading an existing file"
2. Extrae el archivo `meta-ads-calculator.tar.gz` en tu computadora
3. Arrastra todos los archivos del proyecto (excepto `node_modules` y `.next`)
4. Escribe un mensaje de commit: "Initial commit - Meta Ads Calculator"
5. Haz clic en "Commit changes"

#### Opción B: Usando Git (si tienes Git instalado)

```bash
# Extrae el proyecto
tar -xzf meta-ads-calculator.tar.gz
cd meta-ads-calculator

# Inicializa Git
git init
git add .
git commit -m "Initial commit - Meta Ads Calculator"

# Conecta con tu repositorio (reemplaza USERNAME con tu usuario)
git remote add origin https://github.com/USERNAME/meta-ads-calculator.git
git branch -M main
git push -u origin main
```

### Paso 4: Desplegar en Vercel

1. Ve a tu dashboard de Vercel: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Haz clic en "New Project"
3. Busca tu repositorio `meta-ads-calculator`
4. Haz clic en "Import"
5. Vercel detectará automáticamente que es un proyecto Next.js
6. **No cambies ninguna configuración** - los valores por defecto son correctos:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
7. Haz clic en "Deploy"

### Paso 5: Esperar el Despliegue

El proceso tomará entre 2-5 minutos. Verás:
- ✅ Cloning repository
- ✅ Installing dependencies
- ✅ Building application
- ✅ Deploying to production

### Paso 6: ¡Listo!

Una vez completado, Vercel te dará:
- **URL de producción**: `https://meta-ads-calculator-xxx.vercel.app`
- **URL personalizada** (opcional): Puedes configurar un dominio personalizado

## 🔧 Método 2: Despliegue usando Vercel CLI

Si prefieres usar la línea de comandos:

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Autenticarse

```bash
vercel login
```

### Paso 3: Desplegar

```bash
# Navega al directorio del proyecto
cd meta-ads-calculator

# Despliega
vercel

# Para despliegue a producción
vercel --prod
```

## ⚙️ Configuraciones Avanzadas

### Variables de Entorno

Si necesitas agregar variables de entorno:

1. Ve a tu proyecto en Vercel Dashboard
2. Haz clic en "Settings"
3. Selecciona "Environment Variables"
4. Agrega las variables necesarias

### Dominio Personalizado

Para usar tu propio dominio:

1. Ve a "Settings" > "Domains"
2. Agrega tu dominio
3. Configura los DNS según las instrucciones

### Configuración de Build

Si necesitas personalizar el build, crea un archivo `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## 🔍 Verificación del Despliegue

Una vez desplegado, verifica que todo funcione:

1. **Página principal**: Debe cargar sin errores
2. **Formulario**: Debe calcular correctamente
3. **KPIs**: Debe permitir edición
4. **Exportación**: Debe generar archivos CSV/PDF
5. **Responsive**: Debe verse bien en móvil y desktop

## 🐛 Solución de Problemas

### Error de Build

Si el build falla:

1. Verifica que `package.json` tenga todas las dependencias
2. Asegúrate de que no hay errores de TypeScript
3. Revisa los logs en Vercel Dashboard

### Error 404

Si obtienes errores 404:

1. Verifica que el archivo `src/app/page.tsx` existe
2. Asegúrate de usar App Router de Next.js 13+

### Problemas de Performance

Para optimizar performance:

1. Verifica que las imágenes estén optimizadas
2. Usa `next/image` para imágenes
3. Implementa lazy loading donde sea necesario

## 📊 Monitoreo y Analytics

### Vercel Analytics

Para habilitar analytics:

1. Ve a tu proyecto en Vercel
2. Haz clic en "Analytics"
3. Habilita "Web Analytics"

### Performance Monitoring

Vercel proporciona métricas automáticas:
- Core Web Vitals
- Performance Score
- Error Tracking

## 🔄 Actualizaciones Automáticas

Una vez configurado, cada vez que hagas cambios:

1. Sube los cambios a GitHub
2. Vercel automáticamente detectará los cambios
3. Iniciará un nuevo despliegue
4. Tu sitio se actualizará automáticamente

## 🎯 URLs Finales

Después del despliegue tendrás:

- **URL Principal**: `https://meta-ads-calculator-[random].vercel.app`
- **URL de Preview**: Para cada branch/PR
- **URL de Development**: Para testing

## 📞 Soporte

Si encuentras problemas:

1. **Documentación de Vercel**: [vercel.com/docs](https://vercel.com/docs)
2. **Comunidad**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
3. **Status Page**: [vercel-status.com](https://vercel-status.com)

## ✅ Checklist Final

Antes de considerar el despliegue completo:

- [ ] Aplicación carga correctamente
- [ ] Todos los cálculos funcionan
- [ ] Exportación CSV/PDF funciona
- [ ] Responsive design funciona
- [ ] Performance > 90 en Lighthouse
- [ ] No hay errores en consola
- [ ] SSL habilitado (automático en Vercel)

¡Tu aplicación Meta-Ads Budget & KPI Calculator estará disponible 24/7 para todo el mundo!

