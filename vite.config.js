import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig, lazyPlugins } from 'vite-plus'

// https://vite.dev/config/
// order: tailwind (pure CSS) -> react (claims .jsx) -> svelte
export default defineConfig({
  fmt: {},
  lint: {"jsPlugins":[{"name":"vite-plus","specifier":"vite-plus/oxlint-plugin"}],"rules":{"vite-plus/prefer-vite-plus-imports":"error"},"options":{"typeAware":true,"typeCheck":true}},
  plugins: lazyPlugins(() => [tailwindcss(), react(), svelte()]),
  server: {
    host: '0.0.0.0',
    port: 5199,
    allowedHosts: ['catred.motmot-kanyu.ts.net']
  },
  preview: {
    host: '0.0.0.0'
  }
})
