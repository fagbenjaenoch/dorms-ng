const path = require("path");

const buildEslintCommand = filenames =>
  `eslint --fix ${filenames.map(f => `"${path.relative(process.cwd(), f)}"`).join(" ")}`;

module.exports = {
  // Check TypeScript files
  "**/*.{ts,tsx}": () => "bun run type-check",

  // Lint and format JavaScript/TypeScript
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],

  // Format other files
  "**/*.{json,md,yml,yaml}": ["bun run format"],
};
