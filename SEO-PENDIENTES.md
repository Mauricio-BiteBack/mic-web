# SEO — Tareas pendientes

Este archivo recoge lo que queda fuera del trabajo de la rama `seo/mexico`
y debe completarse antes o después del despliegue, según se indica.

---

## Antes de publicar /mexico

Los siguientes marcadores `[CONFIRMAR]` deben resolverse con el equipo de MIC
antes de quitar el `noindex` y añadir /mexico al sitemap:

- [ ] Cobertura actual en México: ciudades o regiones atendidas
- [ ] Qué canales o marcas están disponibles en territorio mexicano
- [ ] Restricciones de derechos por territorio (qué canales NO aplican en MX)
- [ ] Documentos que recibe el operador (sublicencia, carta de derechos, otro)
- [ ] Condiciones para ISP y WISP en México
- [ ] Si aplica la política de contrato flexible (sin ataduras ni mínimos)
- [ ] Moneda de facturación para México y precio de referencia publicable
- [ ] Número de WhatsApp dedicado para México (hoy apunta al número de Lima)
- [ ] Horario de atención para México

Pasos para publicar /mexico cuando los datos estén confirmados:
1. Actualizar `src/app/mexico/layout.tsx`: cambiar `robots: { index: false, follow: false }` a `robots: { index: true, follow: true }` (o eliminar la clave robots).
2. Añadir `/mexico` al sitemap en `src/app/sitemap.ts`.
3. Revisar y reemplazar todos los `[CONFIRMAR]` en `src/app/mexico/page.tsx`.
4. Crear commit, revisar en staging y desplegar.

---

## Contenido de banners

- [ ] Rehacer los banners que contienen texto "+100" incrustado en la imagen
  (hoy el alt text ya fue corregido a "96 canales en IP", pero el texto
  dentro de la imagen `/banner-mic-2.webp` sigue diciendo "+100").
  Requiere actualizar el archivo de imagen; MIC debe exportar una nueva versión.

---

## Derechos de imágenes

- [ ] Revisar los derechos de las fotos de actores y personajes usadas en
  las fichas de canales. Confirmar que MIC tiene licencia para publicarlas
  o reemplazarlas si no la tiene.

---

## Herramienta EPG (/programacion/chiki-toonz)

- [ ] Consultar con la persona responsable de la herramienta EPG sobre:
  - Metadata y canonical de `/programacion/chiki-toonz`
  - Si debe aparecer en el sitemap o mantenerse fuera
  - Si necesita noindex temporal mientras está en desarrollo

---

## FAST y publicidad programática

- [ ] Preguntar a MIC si siguen ofreciendo FAST channels y publicidad
  programática como servicios activos. Hoy aparecen mencionados en
  la descripción global del sitio pero no hay página de servicio dedicada.
  Si se descontinuaron, actualizar la descripción en `src/app/layout.tsx`.

---

## Formulario de contacto — pendientes

- [ ] El formulario de `/contacto` y `/mexico` envía el mensaje por correo
  mediante el webhook de n8n, pero el origen del mensaje (`Origen: mexico-seo`)
  **no llega a Odoo CRM**: solo queda en el buzón de correo que reciba el webhook.
  Si MIC necesita registrar los leads de México en el CRM, hay que extender
  la API o el flujo de n8n.

- [ ] Confirmar con MIC qué buzón de correo recibe los mensajes del formulario
  de contacto y si es el mismo que lee el equipo comercial. El texto del
  formulario actual menciona `info@mic.pe` pero el webhook puede enviar a
  una dirección distinta. Corregir el texto visible si no coincide.

---

## Imagen principal de la portada

- [ ] La imagen `/banner-mic-2.webp` pesa ~4 MB. Conviene recomprimirla
  (sin cambiar `images.unoptimized` en `next.config.ts`). Exportar una
  versión nueva desde el software de diseño al tamaño de uso real
  (~2050 x 796 px) y reemplazar el archivo en `public/`.

---

## Hreflang (nota para el futuro)

No se implementó hreflang en esta rama porque no existen páginas equivalentes
enlazadas entre sí por país. `/mexico` es una landing independiente, no una
traducción de la portada. Si en el futuro se crea una versión en español de
México de páginas como la portada o el catálogo, en ese momento corresponde
añadir hreflang entre ambas versiones.

---

## Redirección permanente mic.pe → www.mic.pe

Acción manual en Vercel (no es código):
1. Vercel Dashboard → proyecto → Settings → Domains.
2. Verificar que `www.mic.pe` sea el dominio principal.
3. El dominio sin www (`mic.pe`) debe tener configurada redirección 308
   hacia `https://www.mic.pe`. Vercel lo gestiona desde la misma pantalla
   de dominios al marcar `mic.pe` como "redirect to www.mic.pe".

---

## Search Console y sitemap

Acciones manuales después del despliegue:
1. Verificar `https://www.mic.pe` en Google Search Console (si no está hecho).
2. Enviar el sitemap: Search Console → Sitemaps → `https://www.mic.pe/sitemap.xml`.
3. Usar "Inspeccionar URL" para solicitar indexación de las páginas principales.
