module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      options: {
        parser: 'babel',
      },
    },
    {
      files: ['*.json', '*.jsonc'],
      options: {
        parser: 'json',
      },
    },
  ],
}; 