import type { UserConfig } from 'vite'

export default {
  build: {
    outDir: 'build',
    lib: {
      name: 'awaitTimer',
      entry: 'lib/index.ts',
      fileName: 'index',
    },
  },
} satisfies UserConfig
