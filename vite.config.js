import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// order: tailwind (pure CSS) -> react (claims .jsx) -> svelte
export default defineConfig({
  plugins: [tailwindcss(), react(), svelte()],
  server: {
    allowedHosts: ['catred.motmot-kanyu.ts.net']
  }
})
