import { baseConfig, commonJsConfig, nodeConfig, reactConfig } from '@repo/eslint-config';

export default [
  {
    ignores: ['apps/web/**', '**/dist/**', '**/coverage/**', '**/node_modules/**']
  },
  ...baseConfig,
  {
    files: ['apps/api/**/*.ts'],
    ...nodeConfig,
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off'
    }
  },
  {
    files: ['packages/api-client/**/*.ts', 'packages/shared-types/**/*.ts'],
    ...nodeConfig
  },
  {
    files: ['packages/ui/**/*.{ts,tsx}'],
    ...reactConfig
  },
  {
    files: ['**/*.cjs'],
    ...commonJsConfig
  }
];
