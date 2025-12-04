import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      preserveSymlinks: true,
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@ui8kit/core': path.resolve(__dirname, './src/components/ui8kit')
      }
    },
    define: {
      // Make environment variables available in the client
      'import.meta.env.VITE_GRAPHQL_ENDPOINT': JSON.stringify(env.VITE_GRAPHQL_ENDPOINT)
    }
  }
})
