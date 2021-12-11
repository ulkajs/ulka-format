# ulka-format

Formatter for ulka.

> This formatter is for `@ulkajs/template-engine`. It will not work for `ulka-parser` as syntax for ulka block is changed from `{%%}` to `{{}}` in `@ulkajs/template-engine`

## Installation

```sh
npm i @ulkajs/format -D

# OR yarn add -D @ulkajs/format
```

## Usage

- Javascript Api

  ```js
  const format = require("format");

  format(ulkatext, prettierOptions);
  ```

- Cli

  ```sh
  ulka-format src/**.ulka
  ```

> Note: This package uses prettier to format ulka but it is not a plugin for prettier.
