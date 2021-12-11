import prettier, { Options } from "prettier";

export = format;

function format(str: string, config?: Options | null) {
  config = config || {};

  str = replaceUlkaTags(str, config);

  str = prettier.format(str, { ...config, parser: "html" });

  str = replaceScriptTags(str);

  return str;
}

function replaceUlkaTags(str: string, config: Options) {
  return str.replace(
    /(\\)?(\\)?{{(.*?)}}/gs,
    (match, slash1, slash2, js, index) => {
      if (slash1 && !slash2) return match;

      const hasSlash = slash2 === "\\";

      if (!/\s/.test(str[index - 1]) || !/\s/.test(str[index + match.length])) {
        const formatted = prettier
          .format(js, { ...config, parser: "babel" })
          .trim();

        if (!formatted.includes("\n")) {
          let result = `{{ ${formatted} }}`;

          if (hasSlash) result = "\\\\" + result;

          return result;
        }
      }

      return `<script data-attr-added-by-ulka-formatter ${hasSlash}>${js}</script>`;
    }
  );
}

function replaceScriptTags(str: string) {
  return str.replace(
    /<script data-attr-added-by-ulka-formatter (true|false)>(.*?)<\/script>/gs,
    (_, slash, js) => {
      let result = slash === "true" ? "\\\\" : "";

      if (js.trim().includes("\n")) result += `{{${js}}}`;
      else result += `{{ ${js.trim()} }}`;

      return result;
    }
  );
}
