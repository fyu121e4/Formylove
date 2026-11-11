// ============================================================
//  TEXTOS EDITABLES — cambia aquí cartas, títulos y mensajes.
//  Los saltos de párrafo se escriben como elementos separados.
// ============================================================

export const content = {
  stepNames: ['La carta', 'Unas palabras', 'Recuerdos', 'Canciones', 'Final'],

  intro: {
    title: '¡Has recibido una carta especial!',
    question: '¿Quieres abrirla?',
    yes: 'SÍ',
    no: 'NO',
    envelopeLabel: 'Para ti ❤️',
    // Se muestran en orden cada vez que pulsa NO.
    noMessages: [
      '¿komo k no?',
      '¿no me amas ;v?',
    ],
  },

  letter: {
    title: 'Unas palabras para ti...',
    paragraphs: [
      "Holi, amorcito. ¡Feliz aniversario! Estoy muy feliz de que haya llegado este día junto a la persona que más amo en este mundo. Si te soy sincero, la verdad que nunca esperé enamorarme de alguien tanto, pero tú me enseñaste este sentimiento llamado amor, me hiciste descubrir nuevas emociones que jamás me imaginé. Tampoco me imaginaba que una persona tan buena se iba a enamorar de mí. Eres increíble en todas tus facetas, eres inteligente, amable, tierna, preciosa, responsable, etc. Siento que si tuviera que escribir más aspectos acerca de ti, solo sería una carta de eso, por eso quiero que en esta carta queden cositas que me gustaron de ti.",
      "Aún recuerdo la primera vez que hablamos y nos quedamos con el Martín hasta las 5 de la mañana y te pasaste de confianzuda. Cuando empezamos a hablar y me preguntaste todo el día si iba a estar en la peña y por qué horas iba a estar, para luego a la noche pasar a jugar 99 noches en el bosque y que te pasara mi cuenta de Minecraft. Otro momento era mientras me esperabas en el colegio después de mi salida al cerro y que no querías que me vaya. Cuando empezamos a hablar hasta las 3 de la mañana. Después nos empezamos a juntar en nuestras casitas. Pero, sobre todo, recuerdo cuando me robaste mi primer beso y pensé qué chica tan kiut que me acaba de asaltar.",
      "Bueno, amorcito, estos sentimientos igual me lo han hecho pasar difícil a veces, pero sabes que no me arrepiento de nada. Me encanta saber que me amas y es el mejor sentimiento del mundo.",
      "Por último, antes de dejarte seguir viendo tu regalo, me gustaría agradecerte por ser mi lugar en el mundo."
    ],
    signature: 'De',
    from: 'Tu Nico',
    skipButton: 'Leer todo',
    button: 'Seguir leyendo nuestra historia ❤️',
  },

  memories: {
    title: 'Nuestro 1a',
    button: 'Escuchar nuestras canciones 🎵',
  },

  music: {
    title: 'Las canciones que cuentan nuestra historia',
    button: 'Seguir con el final ❤️',
  },

  video: {
    title: 'Y si pudiera volver a elegir...',
    // Coloca tu video en public/videos y cambia el nombre aquí.
    src: '/videos/harvey.mp4',
    poster: '',
    // Proporción del video: '16 / 9' (horizontal), '9 / 16' (vertical), '1 / 1'...
    aspect: '16 / 9',
  },

  final: {
    title: 'Mi última carta para ti...',
    paragraphs: [
      "Bueno, perdón por hacer algo tan simple, pero es la primera vez que hago una página desde cero y me parecía un detalle bonito, la verdad. Me tardé sus buenas horas seguidas en hacerlo porque subestimé la dificultad de esto. Me hubiera gustado juntarme contigo hoy y que vieras cómo reaccionas con la página en persona, pero es lo que hay.",
    ],
    highlight: 'Te amo y siempre te amaré hasta el infinito.',
    signature: 'Con amor',
    from: 'Tu Nico',
    restart: 'Volver a empezar',
  },
}

// Stickers enviados para Nuestro primer año juntos.
export const decorations = {
  snoopy: { src: '/decorations/snoopy-anniversary.png', emoji: '🐶', label: 'Snoopy' },
  spiderman: { src: '/decorations/web-heart.png', emoji: '🕸️', label: 'Corazón de telarañas' },
}
