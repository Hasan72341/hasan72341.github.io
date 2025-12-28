import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/hasan.github.io/',
  server: {
    host: true,        // expose to network (0.0.0.0)
    port: 5173,        // optional (default)
    strictPort: true, // optional: fail if port is taken
  },
})
