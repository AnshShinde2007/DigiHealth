import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Security-Policy': "script-src 'self' dev-80yd7ehi43fqphtt.us.auth0.com 'unsafe-inline' 'unsafe-eval';"
    }
  }
})

