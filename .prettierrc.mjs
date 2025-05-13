/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  tabWidth: 2,
  useTabs: false,
  trailingComma: "es5",
  singleQuote: true,
  jsxSingleQuote: true,
  endOfLine: "auto",
  printWidth: 120,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindFunctions: ["clsx"],
};

export default config;
