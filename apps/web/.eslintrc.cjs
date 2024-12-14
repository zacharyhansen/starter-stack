/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/next.cjs'],
  ignorePatterns: ['lib/database.types.ts'],
};
