# William Burrión · Tinta y píxel

Portafolio con Next.js, TypeScript, Tailwind/CSS y Motion. Interfaz en español, inglés y japonés, ilustraciones originales, modo claro/oscuro y movimiento reducido.

## Desarrollo

Requiere Node.js 24 LTS, también configurado para Vercel en `package.json`.

```sh
nvm use # opcional, si tienes nvm
npm ci
npm run dev
```

Abrir http://localhost:3000. La raíz redirige a `/es`. También están disponibles `/en` y `/ja`.

```sh
npm run build
npm start
```

## Qué está implementado

- Portada con caligrafía, manchas de tinta y pixel art.
- Entrada por líneas del nombre, trazado de kanji y revelado de tinta y paisaje en capas.
- Títulos, párrafos e imágenes aparecen una vez al hacer scroll; botones con respuesta al cursor.
- Celular con fichas de siete proyectos reales y un laboratorio con tres demos locales.
- Filtros de proyectos de Alisa y personales; Core y PioApp como aplicaciones separadas sobre WhiteLabel.
- Flotación del celular con pausas, detenida al interactuar; navegación animada entre sus pantallas.
- Reserva y cancelación de espacios, bot con respuestas de ejemplo y pedidos con cambios de estado.
- Selección de proyectos y vista amplia para probar las interfaces.
- Trayectoria profesional basada en el CV, presentación personal, tecnologías y contacto.
- Correo, LinkedIn y CV público en español, inglés y japonés, con selector independiente para descargar.
- Preferencias de tema y animación persistentes; respeto a `prefers-reduced-motion`.
- Cambio de idioma conservando el proyecto seleccionado y el ancla de navegación.
- Navegación fija al hacer scroll, con espacio reservado para los títulos de cada sección.
- Easter egg del gato en la ilustración de «Sobre mí».

El catálogo contiene Core, PioApp, Pinulito Delivery, ScanLearn, ChatMenu, Proferre y este portafolio. Sus fichas describen funciones, contribución, tecnologías y estado. Son presentaciones interactivas; no ejecutan los sistemas originales. Este repositorio incluye únicamente el código del portafolio y recursos para su presentación.

Las tres demos del laboratorio usan datos de ejemplo y funcionan en memoria del navegador. El bot no utiliza un modelo de IA ni envía mensajes externos.

## Personalizar contenido

| Archivo | Contenido |
| --- | --- |
| `src/content/project-catalog.ts` | Fichas de los siete proyectos, funciones, tecnologías y traducciones |
| `src/content/projects.ts` | Ejemplos del laboratorio, trayectoria y enlaces sociales |
| `src/content/i18n.ts` | Textos en los tres idiomas, incluida la biografía |
| `src/components/demo-apps.tsx` | Recorridos funcionales del celular |
| `src/components/phone.tsx` | Menú, navegación y marco del dispositivo |
| `src/components/project-case.tsx` | Fichas navegables dentro del celular |
| `src/components/cv-download.tsx` | Selector de idioma y descarga del CV |
| `src/components/page-motion.tsx` | Revelados accesibles y pausa de movimiento fuera de pantalla |
| `src/app/globals.css` | Paleta, composición, estados y animaciones |
| `public/art/` | Imágenes WebP optimizadas para la web |
| `public/cv/william-burrion-{es,en,ja}.pdf` | CV descargable por idioma |
| `scripts/cv-content.json` | Contenido equivalente de los tres CV |

Para actualizar las fichas, editar `project-catalog.ts`. Los recursos de marca están en `public/projects/`. Las futuras capturas o recorridos de las aplicaciones pueden incorporarse a `project-case.tsx`, identificando correctamente su origen y evitando mostrar información privada.

GitHub se muestra al completar `social.github` con un enlace real. El texto personal de «Sobre mí» puede editarse después en los tres diccionarios.

Los CV públicos son versiones equivalentes de dos páginas, centradas en información profesional. El japonés utiliza fuentes incrustadas; la URL anterior del CV español se conserva. Los PDF ya están generados y no requieren Python para construir o desplegar la web. Para regenerarlos después de editar `scripts/cv-content.json`:

```sh
python3 -m venv .venv-tools
.venv-tools/bin/pip install 'fonttools[woff]' brotli reportlab pypdf
.venv-tools/bin/python scripts/subset-fonts.py
.venv-tools/bin/python scripts/prepare-cv-fonts.py
.venv-tools/bin/python scripts/create-public-cv.py
```

## Comprobaciones

```sh
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm test
```

Las pruebas requieren el servidor ejecutándose en el puerto 3000. Para otra dirección:

```sh
TEST_BASE_URL=http://localhost:3001 npm test
```

Las pruebas cubren los tres recorridos, los idiomas, las preferencias, navegación móvil, desbordamiento horizontal, descarga del CV y accesibilidad WCAG AA automatizada. Incluyen selección de proyectos, filtros, funciones y arquitectura de las fichas y descarga de los tres PDF. También comprueban que las animaciones no se repitan al volver a una sección, que se detengan al interactuar o salir de pantalla, que el movimiento reducido se aplique en vivo y que el contenido siga visible con teclado o sin JavaScript. La revisión automática no sustituye una evaluación completa con tecnologías de asistencia.

Para revisar la entrada, recargar la página desde el principio y después recorrer las secciones. «Reducir animaciones» desactiva el movimiento y conserva la preferencia. Los bucles ambientales también se pausan al cambiar de pestaña.

Para repetir la medición con un servidor de producción activo:

```sh
AUDIT_URL=http://localhost:3001/es node scripts/audit.mjs
```

## Fuentes optimizadas

Las fuentes se sirven desde `public/fonts/`, con sus licencias. La caligrafía y el texto japonés usan subconjuntos de los caracteres presentes en el sitio para reducir la descarga inicial. Al añadir textos nuevos, los caracteres adicionales utilizan la fuente de sistema hasta regenerar los subconjuntos:

```sh
python3 -m venv .venv-tools
.venv-tools/bin/pip install 'fonttools[woff]' brotli
.venv-tools/bin/python scripts/subset-fonts.py
```

El script obtiene las fuentes originales del repositorio oficial de Google Fonts si no están en la caché local y genera `src/app/fonts.css` y los archivos WOFF2.

## Publicación

1. En [Vercel / New Project](https://vercel.com/new), conectar GitHub e importar `QPWilliam/qpw-portfolio`.
2. Mantener **Framework Preset: Next.js**, **Root Directory: `./`**, instalación y salida automáticas, y **Build Command: `npm run build`**.
3. Usar **Node.js 24.x** (declarado en `package.json`). No hacen falta variables de entorno, base de datos ni claves externas para esta versión.
4. Pulsar **Deploy**. Revisar `/es`, `/en`, `/ja`, los proyectos y las tres descargas de CV en la URL asignada.

Vercel conectará las siguientes subidas a `main` con nuevos despliegues de producción. Ver la [integración oficial con Git](https://vercel.com/docs/git). Al elegir un dominio definitivo, se pueden añadir `metadataBase`, URLs canónicas y un sitemap para las tres rutas.

## Archivos públicos

`.gitignore` permite expresamente los archivos de configuración y las carpetas `src`, `public`, `scripts` y `tests`. Los documentos originales, notas de trabajo, herramientas locales, informes, dependencias y secretos quedan fuera del repositorio. Al crear una nueva carpeta en la raíz, revisar su contenido y añadirla a la lista permitida si debe versionarse.

Todo lo que se añada a `public/` será accesible desde la web. Esa carpeta contiene únicamente ilustraciones, logotipos de los proyectos, fuentes con sus licencias y CV preparados para descarga pública.
