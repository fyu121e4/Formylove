export type Song = {
  id: string
  title: string
  artist: string
  cover: string
  file: string
}

const track = (id: string, title: string, artist: string): Song => ({
  id, title, artist,
  cover: '/images/covers/' + id + '.jpg',
  file: '/music/' + id + '.mp3',
})

export const songs = [
  track('harvey', 'Harvey', "Her's"),
  track('accidentally-in-love', 'Accidentally in Love', 'Counting Crows'),
  track('chachacha', 'Chachachá', 'Jósean Log'),
  track('mystery-girl', 'Mystery Girl', 'Housecall'),
]
