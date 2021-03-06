module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  importOrderSeparation: true,
  importOrder: ['<THIRD_PARTY_MODULES>', '^[./]'],
  tailwindConfig: './tailwind.config.js',
  // Required to load plugins manually
  // Auto-loading is not working for this plugin
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@trivago/prettier-plugin-sort-imports'),
  ],
}
