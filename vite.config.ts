import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const useApi = env.VITE_USE_API === 'true';

  return {
    plugins: [react()],
    base: './',
    server: {
      port: 5173,
      proxy: useApi ? { '/api': env.VITE_API_TARGET || 'http://localhost:4000' } : undefined,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  };
});
