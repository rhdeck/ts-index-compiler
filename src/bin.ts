#!/usr/bin/env node
import commander from "commander";
import { spawnSync } from "child_process";
import { join, resolve } from "path";
import { copyFileSync, unlinkSync } from "fs";
commander.option(
  "-o --out <filepath>",
  "Output file to be generated",
  "./src/index.ts"
);
commander.option(
  "-p --path <path>",
  "Path to recursively examine for outputs",
  "./src"
);
commander.description(
  "Auto-generate an index.ts file from typescript source files - build your libraries with freedom!"
);
commander.action(({ path, out }) => {
  const source = join(__dirname, "..", "src", "make-index.ts");
  const dest = join(resolve(process.cwd(), path), "make-index.ts");
  try {
    //copy make_index
    copyFileSync(source, dest);
    spawnSync("npx", ["ts-node", dest, out], {
      stdio: "inherit",
    });
  } catch (e) {
    console.error(e);
    console.log("oh noes");
  }
  try {
    unlinkSync(dest);
  } catch (e) {}
});
commander.parse(process.argv);
export { commander };
