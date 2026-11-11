# Nuestro primer año juntos ❤️

Álbum interactivo en React, TypeScript, Vite, Tailwind CSS y Framer Motion.

## Ejecutar

Abre una terminal dentro de love-story y ejecuta:

    npm ci
    npm run dev

Abre la dirección que indica Vite. Ejecuta npm run typecheck para verificar los tipos y npm run build para compilar el sitio en dist/.

## Personalizar los archivos

| Archivo | Ubicación |
|---|---|
| Fotografías | public/images/. Admite JPG, JPEG, PNG y WEBP, en mayúsculas y minúsculas. |
| Harvey | public/music/harvey.mp3 |
| Accidentally in Love | public/music/accidentally-in-love.mp3 |
| Chachachá | public/music/chachacha.mp3 |
| Mystery Girl | public/music/mystery-girl.mp3 |
| Video | public/videos/harvey.mp4 |
| Portadas | public/images/covers/. Usa el mismo nombre base que cada MP3 con extensión .jpg. |

El proyecto incluye las 15 fotos, los cuatro MP3, las portadas y el MP4 del archivo original. Ocho fotos se convirtieron de HEIC a JPG. Convierte las nuevas fotos HEIC antes de agregarlas.

El catálogo de fotos se actualiza al arrancar Vite y al compilar. Con el servidor abierto, ejecuta npm run photos o reinícialo. Edita las cartas y los mensajes en src/data/content.ts. Las fotos se muestran sin pies de foto.

El video de la sección musical se inicia silenciado con Harvey y sigue su estado de reproducción. La sección final conserva su propio reproductor y utiliza el mismo MP4. Puedes cambiar la ruta en src/data/content.ts. Para un video vertical, ajusta también video.aspect en ese archivo para la sección final.

El carrusel cuenta con controles manuales y un botón para detener el avance. Con movimiento reducido, el avance automático comienza desactivado y el vinilo permanece quieto.
