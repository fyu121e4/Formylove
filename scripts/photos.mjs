// Lee public/images y guarda la lista de fotos en src/data/photoFiles.json.
// Se ejecuta solo con "npm run dev" y "npm run build". Pon tus fotos en public/images con cualquier nombre.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'public', 'images')
const out = join(root, 'src', 'data', 'photoFiles.json')
const ok = /\.(jpe?g|png|webp|gif|avif)$/i

const files = existsSync(dir)
  ? readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isFile() && ok.test(e.name))
      .map((e) => e.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  : []

const manifest = JSON.stringify(files, null, 2) + '\n'
if (!existsSync(out) || readFileSync(out, 'utf8') !== manifest) {
  writeFileSync(out, manifest)
}
console.log(`[fotos] ${files.length} foto(s) encontradas en public/images`)
