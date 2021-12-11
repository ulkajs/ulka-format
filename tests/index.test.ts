import ulkaFormat from "../src";

const config = { semi: true, tabWidth: 2 };

const format = (str: string) => ulkaFormat(str, config);

describe("format", () => {
  test("should format html", () => {
    const formatted = ulkaFormat(`   <h1>  Hello   </h1>`).trim();
    expect(formatted).toBe(`<h1>Hello</h1>`);
  });

  test("should format ulka block", () => {
    const formatted = format(`{{ name  }}`).trim();
    expect(formatted).toBe(`{{ name; }}`);
  });

  test("should not format escaped ulka block", () => {
    const str = `\\{{ name }}`;
    const formatted = format(str).trim();
    expect(formatted).toBe(str);
  });

  test("shoul format ulka block if slash is escaped", () => {
    const formatted = format(`\\\\{{ name   }}`).trim();
    expect(formatted).toBe(`\\\\{{ name; }}`);
  });

  test("should format multiline js", () => {
    const formatted = format(
      `{{
          const name = "Roshan Acharya"
          console.log(name)
      }}`
    ).trim();

    expect(formatted).toBe(
      `{{\n  const name = "Roshan Acharya";\n  console.log(name);\n}}`
    );
  });

  test("should escape ulka block for multiline", () => {
    const formatted = format(`\\{{
        const name = "Roshan Acharya"
        console.log(name)
    }}`).trim();

    expect(formatted).toBe(
      `\\{{ const name = "Roshan Acharya" console.log(name) }}`
    );
  });

  test("should format multiline js if slash is escaped", () => {
    const formatted = format(
      `\\\\{{
        const name = "Roshan Acharya"
        console.log(name)
    }}`
    ).trim();

    expect(formatted).toBe(
      `\\\\{{\n  const name = "Roshan Acharya";\n  console.log(name);\n}}`
    );
  });

  test("should format ulka tag inside span", () => {
    expect(format(`<span> {{name}} </span>`).trim()).toBe(
      `<span>\n  {{ name; }}\n</span>`
    );
    expect(format(`<span>{{ name }}</span>`).trim()).toBe(
      `<span>{{ name; }}</span>`
    );
  });

  test("should ignore file if starts with <!-- ulka-format-ignore -->", () => {
    const str = `<!-- ulka-format-ignore --> {{name  }}`;
    expect(format(str)).toBe(str);
  });
});
