import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // For GitHub Pages: replace `tracker` with your repo name if it changes
  base: '/tracker/',
  plugins: [react()],
})
