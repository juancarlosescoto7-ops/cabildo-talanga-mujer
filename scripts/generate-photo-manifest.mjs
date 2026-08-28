import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesRoot = path.join(projectRoot, "public", "images", "cabildo-mujer", "ejes");
const outputFile = path.join(projectRoot, "data", "carousel-photo-manifest.ts");
const axes = ["economia", "prevencion-violencia", "salud", "participacion", "educacion", "ambiente"];
const supportedImage = /\.(avif|gif|jpe?g|png|webp)$/i;

const manifest = {};
for (const axis of axes) {
  const entries = await readdir(path.join(imagesRoot, axis), { withFileTypes: true });
  manifest[axis] = entries
    .filter((entry) => entry.isFile() && supportedImage.test(entry.name))
    .map((entry) => `/images/cabildo-mujer/ejes/${axis}/${encodeURIComponent(entry.name)}`)
    .sort((left, right) => left.localeCompare(right, "es", { numeric: true }));
}

const generated = `// Generado automáticamente por scripts/generate-photo-manifest.mjs.\n` +
  `// Agregue fotografías en las carpetas de cada eje y ejecute npm run photos:sync.\n` +
  `export const carouselPhotoManifest = ${JSON.stringify(manifest, null, 2)} as const;\n`;

let current = "";
try { current = await readFile(outputFile, "utf8"); } catch { /* El archivo se creará. */ }
if (current !== generated) await writeFile(outputFile, generated, "utf8");

for (const axis of axes) console.log(`${axis}: ${manifest[axis].length} fotografías`);
