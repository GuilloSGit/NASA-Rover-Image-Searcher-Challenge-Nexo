import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/NASA_image_searcher',
  plugins: [react()],
})
