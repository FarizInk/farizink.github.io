import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelte.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.svelte'],
        sourceType: 'module'
      }
    }
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.svelte'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-var': 'error'
    }
  },
  {
    files: ['src/lib/router.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/', 'gh-pages.cjs']
  }
];
