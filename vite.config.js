// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(),
  tailwindcss(),
  ],
  server: {    
  },
  base: 'https://github.com/vsmyrnaios/to-do-list'
})
