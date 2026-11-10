import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const useApi = env.VITE_USE_API === 'true';

  return {
    plugins: [react()],
    base: '/Kal-online/',
    server: {
      port: 5173,
      // Only proxy to the backend when you explicitly turn it on
      proxy: useApi ? { '/api': env.VITE_API_TARGET || 'http://localhost:4000' } : undefined,
    },
  };
});
