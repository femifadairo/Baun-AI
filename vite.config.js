import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
/*
  proxy: {
    '/': {
      target: 'http://localhost:11434',
      changeOrigin: true,
      secure: false
    },
    '/': {
      target: 'http://10.42.0.1:11434',
      changeOrigin: true,
      secure: false
    }

  }*/
})
