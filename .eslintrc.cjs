module.exports = {
  root: true,
  extends: [
    `@roots/eslint-config/sage`,
    `@roots/eslint-config/typescript`,
    `plugin:react/jsx-runtime`,
  ],
  ignorePatterns: [
    `!.*.js`,
    `!.*.ts`,
    `!.*.tsx`,
    `node_modules`,
    `public/dist`,
    `.budfiles`,
  ],
};
