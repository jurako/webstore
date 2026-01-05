import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

const root = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  envDir: 'app',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/app', import.meta.url))
    }
  }
})
