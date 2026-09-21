import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...tseslint.configs.recommended,
  prettier,

  // Global ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "dist/**",
  ]),

  {
    plugins: {
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "react/no-unescaped-entities": "off",

      // Turn off base rules so unused-imports can handle them correctly
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",

      // Remove unused imports automatically
      "unused-imports/no-unused-imports": "error",

      // Optional: still warn about other unused variables
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Sort imports and exports automatically
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
]);

export default eslintConfig;
