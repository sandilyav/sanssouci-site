import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

import PrerenderSPAPlugin from 'vite-plugin-prerender-spa';

export default defineConfig({
  plugins: [react(), PrerenderSPAPlugin({
    routes: ['/', '/experiences', '/photo-spots', '/plan', '/events', '/gallery', '/about', '/location', '/contact']
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: true,
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});
