import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import neostandard from "neostandard";
// --- 1. New Imports ---
// Import the Tailwind plugin
import tailwind from "eslint-plugin-tailwindcss";
// Import the Prettier config that disables conflicting rules
import prettierConfig from "eslint-config-prettier";
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Load standard rules
  ...neostandard(),
  ...tailwind.configs["flat/recommended"],
  // --- ADD THIS NEW OBJECT ---
  {
    // Apply to all JS/TS files
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    rules: {
      // Turn off the stylistic rule that enforces single quotes
      "@stylistic/quotes": ["error", "double"],
      // OR just turn it off entirely and let VS Code decide:
      // "@stylistic/quotes": "off",
      // --- ADD THIS FOR SEMICOLONS ---
      // Force semicolons everywhere
      "@stylistic/semi": ["error", "always"],
      // Alternatively, if prepending extra semicolons to handle
      // some edge cases is annoying, use the following:
      // "@stylistic/semi": ["error", "always", { "omitLastInOneLineBlock": true}]
      // --- ADD THIS NEW RULE HERE ---
      // This tells ESLint: "In JSX attributes, prefer double quotes."
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
      // --- ADD THIS RULE TO FIX THE SPACE ISSUE ---
      // This tells ESLint: "Anonymous functions need spaces,
      // but named functions like 'Home()' should NOT have a space."
      "@stylistic/space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          asyncArrow: "always",
          named: "never",
        },
      ],
    },
  },
  // ---------------------------
  prettierConfig,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
