import fs from "fs";
import path from "path";
import run from "../src/cli";

const indexfile = path.join(__dirname, "resource", "index.ulka");
const ignoreFile = path.join(__dirname, "resource", "ignorefile.ulka");

let indexFileContent: string;
let ignoreFileContent: string;
beforeAll(async () => {
  indexFileContent = fs.readFileSync(indexfile, "utf-8");
  ignoreFileContent = fs.readFileSync(ignoreFile, "utf-8");

  await run(__dirname, ["resource/**.ulka"]);
});

afterAll(() => {
  fs.writeFileSync(indexfile, indexFileContent);
  fs.writeFileSync(ignoreFile, ignoreFileContent);
});

describe("cli", () => {
  test("should not format ignored file", () => {
    const formatted = fs.readFileSync(ignoreFile, "utf-8");
    expect(formatted).toBe(ignoreFileContent);
  });

  test("should format the file", async () => {
    const formatted = fs.readFileSync(indexfile, "utf-8");

    expect(formatted).not.toBe(indexFileContent);

    expect(formatted).toMatchInlineSnapshot(`
      "<html lang=\\"en\\">
        <head>
          <title>{{ matter.title; }}</title>
        </head>
        <body>
          {{ const name = \\"Roshan Acharya\\"; }}

          {{
            // prettier-ignore
            const html = /* HTML */\` <h1> \${data}    </h1>\`
          }}

          {{
            data
              .map((a) => a.text)
              .filter((a) => a)
              .map((a) => /* HTML */ \`<h1>\${a}</h1>\`);
          }}

          <span>{{ cosnole.log(\\"Hi\\"); }}</span>

          <h1>{{ console.log(\\"Hi\\"); }}</h1>
        </body>
      </html>
      "
    `);
  });
});
