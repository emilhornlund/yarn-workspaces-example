/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      open: mode === 'development',
      port: parseInt(env.SERVER_PORT, 10),
      host: mode === 'development' ? true : 'localhost',
      proxy: {
        [env.API_URL]: {
          target: env.API_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(env.API_URL, ''),
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      include: ['src/**/*.test.ts(x)'],
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
      },
      globals: true,
    },
  };
});
