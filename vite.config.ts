import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import semanticPlugin from "./vite.semantic";
import path from 'path'

export default defineConfig({
  plugins: [react(), semanticPlugin() as any],
  root: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist'
  }
}) 