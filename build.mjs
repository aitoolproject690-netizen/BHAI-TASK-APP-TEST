import { mkdir, copyFile, readFile } from "node:fs/promises";
const src = "index.html";
const outDir = "dist";
const html = await readFile(src, "utf8");

if (!/^<!doctype html>/i.test(html.trim())) {
  throw new Error("index.html is missing a valid doctype");
}

await mkdir(outDir, { recursive: true });
await copyFile(src, `${outDir}/index.html`);

console.log("Static build complete: dist/index.html");
