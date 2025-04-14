import type { UserConfig } from 'vite'

export default {
  build: {
    outDir: 'build',
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
    lib: {
      name: 'zlight',
      entry: 'lib/index.ts',
      fileName: 'index',
    },
  },
} satisfies UserConfig
