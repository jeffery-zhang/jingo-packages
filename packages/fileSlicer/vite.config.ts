import type { UserConfig } from 'vite'

export default {
  build: {
    outDir: 'build',
    lib: {
      name: 'fileSlicer',
      entry: 'lib/index.ts',
      fileName: 'index',
    },
  },
} satisfies UserConfig
