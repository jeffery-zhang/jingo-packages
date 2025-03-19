import type { UserConfig } from 'vite'

export default {
  build: {
    outDir: 'build',
    lib: {
      name: 'awaitTimer',
      entry: 'lib/awaitTimer.ts',
      fileName: 'awaitTimer',
    },
  },
} satisfies UserConfig
