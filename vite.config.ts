import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 1987,
    // eslint-disable-next-line
    // @ts-ignore
    allowedHosts: ['.ngrok-free.app'],
  },
})
