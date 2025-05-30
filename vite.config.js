import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/OldComponents/**/*',
          dest: 'src/OldComponents'
        }
      ]
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  server: {
    fs: {
      // 允许访问 src 目录及其子目录
      allow: ['..']
    }
  }
})
