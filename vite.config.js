import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' so the built site also works from a GitHub Pages sub-path
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // build into docs/ so GitHub Pages can serve straight from the main branch
    outDir: 'docs',
  },
  server: {
    port: Number(process.env.PORT) || 5173,
  },
})
