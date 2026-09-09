import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginStart from '@tanstack/eslint-plugin-start'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    plugins: {
      '@tanstack/start': pluginStart,
    },

    rules: {
      '@tanstack/start/no-client-code-in-server-component': 'error',
      '@tanstack/start/no-async-client-component': 'error',
    },
  },
]