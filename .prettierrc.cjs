/** why: unify style; sort Tailwind classes and imports deterministically */
module.exports = {
  $schema: 'https://json.schemastore.org/prettierrc',
  semi: true,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  tabWidth: 2,
  bracketSpacing: true,
  arrowParens: 'always',
  plugins: [
    'prettier-plugin-tailwindcss',
    'prettier-plugin-organize-imports',
    'prettier-plugin-sort-imports'
  ],
  importOrder: [
    '^react$',
    '^next(/.*)?$',
    '^@?\\w',          // 3rd-party
    '^@/(.*)$',        // @/aliases
    '^~/(.*)$',        // ~/aliases
    '^\\u0000',        // side-effect imports
    '^\\.\\./(.*)$',   // parent
    '^\\./(.*)$'       // sibling
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}
