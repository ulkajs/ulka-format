import fs from "fs";
import path from "path";
import fg from "fast-glob";
import prettier from "prettier";

import format from "./index";

async function run(cwd: string, args: string[]) {
  const config = (await prettier.resolveConfig(cwd, { useCache: false })) || {};

  console.log(config);

  const files = (await fg(args, { cwd, absolute: true })).filter(
    (a) => path.extname(a) === ".ulka"
  );

  const ignorePath = path.join(cwd, ".prettierignore");

  for (const file of files) {
    const info = await prettier.getFileInfo(file, { ignorePath });

    if (!info.ignored) {
      const html = fs.readFileSync(file, "utf-8");
      const formatted = format(html, config);
      fs.writeFileSync(file, formatted);
    }
  }

  console.log(`[ulka-format] Completed.`);
}

export = run;
