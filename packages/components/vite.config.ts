import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vite'

export default {
  plugins: [react()],
  build: {
    outDir: 'build',
    rollupOptions: {
      external: ['react'],
    },
    lib: {
      name: 'zlight',
      entry: 'lib/index.ts',
      fileName: 'index',
    },
  },
} satisfies UserConfig
