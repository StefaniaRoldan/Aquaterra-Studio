import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['msw'], // 👈 Esto es clave para evitar el error con "rest"
  },
})