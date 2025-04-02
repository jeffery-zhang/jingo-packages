import type { UserConfig } from 'vite'

export default {
  build: {
    outDir: 'build',
    lib: {
      name: 'enhancedAbortController',
      entry: 'lib/index.ts',
      fileName: 'index',
    },
  },
} satisfies UserConfig
