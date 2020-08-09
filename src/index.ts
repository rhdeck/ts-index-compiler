import { readdirSync, writeFileSync, lstatSync } from "fs";
import { join, basename } from "path";
import { format } from "prettier";
const base = ".";
export function getExports(
  base: string = ".",
  context = join(process.cwd(), "src")
): [string[], string[]][] {
  const files = readdirSync(join(__dirname, base));
  return files
    .filter((file: string) => file !== "index.ts")
    .map<[string[], string[]]>((file: string) => {
      if (lstatSync(join(base, file)).isDirectory()) {
        return getExports(join(base, file), context).reduce(
          ([is, es], [i, e]) => [
            [...is, ...i],
            [...es, ...e],
          ],
          <[string[], string[]]>[[], []]
        );
      }
      const moduleName = basename(file, ".ts");
      const path = [__dirname, base, file].join("/");
      if (!lstatSync(path).isFile()) return [[], []];
      const out = require(path);
      const keys = Object.keys(out);
      if (!keys.length) return [['require("./' + moduleName + '");'], []];
      let i = "import ";
      let e: string[] = [];
      if (keys.includes("default")) {
        i = i + moduleName + " ";
        e.push(moduleName);
      }
      const namedExports = keys.filter((key) => key !== "default");
      if (namedExports.length) {
        if (keys.includes("default")) i = i + ",";
        i =
          i +
          " {" +
          namedExports.map((x) => x + " as " + moduleName + "_" + x).join(",") +
          "}";
        e.push(
          ...namedExports.map((x) => {
            return moduleName + "_" + x;
          })
        );
      }
      i = i + " from " + '"./' + moduleName + '";';
      return <[string[], string[]]>[[i], e];
    })
    .filter(Boolean);
}
export function makeIndex(
  exports: [string[], string[]][],
  indexPath = "./src/index.ts"
) {
  const arr = exports.reduce(
    ([is, es], [i, e]) => [
      [...is, ...i],
      [...es, ...e],
    ],
    <[string[], string[]]>[[], []]
  );
  const out =
    "/** THIS FILE IS AUTO_GENERATED - MODIFICATIONS MAY NOT BE SAVED */\n" +
    arr.map((i: string[]) => i).join("\n") +
    "\n export{" +
    arr[1].join(",") +
    "};";
  writeFileSync(indexPath, format(out, { parser: "typescript" }));
}
