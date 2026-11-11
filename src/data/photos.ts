import files from './photoFiles.json'

export type Photo = { src: string | null; filename?: string; caption: string }

export const captions: string[] = [
  'Donde todo empezó',
  'Tu sonrisa me desarma',
  'Contigo cualquier lugar es hogar',
  'Un día cualquiera, pero contigo',
  'Mi plan favorito eres tú',
  'Risas que no se olvidan',
  'Nuestro pequeño mundo',
  'Cómo olvidar este día',
  'Contigo todo es más bonito',
  'Mis mejores recuerdos tienen tu cara',
  'Abrazos que lo arreglan todo',
  'Otra aventura a tu lado',
  'Lo mejor de mis días',
  'Tú y yo, siempre',
  'Y lo que falta por vivir',
]

export const photos: Photo[] = files.length
  ? files.map((name, index) => ({
      filename: name,
      src: import.meta.env.BASE_URL + 'images/' + encodeURIComponent(name),
      caption: captions[index % captions.length],
    }))
  : [{ src: null, caption: 'Nuestros recuerdos' }]
