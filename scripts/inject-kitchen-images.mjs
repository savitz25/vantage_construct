import fs from "fs";

const p = "src/lib/kitchen-studio/styles.ts";
let t = fs.readFileSync(p, "utf8");
const ids = [
  "modern-farmhouse",
  "warm-organic",
  "classic-transitional",
  "sleek-european",
  "traditional-luxury",
  "coastal-hamptons",
  "forest-moody",
  "industrial-loft",
  "japandi",
  "white-brass",
  "dark-dramatic",
  "scandinavian",
];
for (const id of ids) {
  const needle = `id: "${id}",`;
  const insert = `id: "${id}",\n    heroImage: "/media/kitchens/${id}.jpg",`;
  if (!t.includes(needle)) throw new Error(`missing ${id}`);
  if (!t.includes(`/media/kitchens/${id}.jpg`)) {
    t = t.replace(needle, insert);
  }
}
fs.writeFileSync(p, t);
console.log("heroImage count", (t.match(/heroImage/g) || []).length);
