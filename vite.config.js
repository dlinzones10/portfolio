import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' keeps asset paths relative, so the same build works on
// GitHub Pages (username.github.io/repo-name/), Vercel, or a local preview.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
