import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public',
  },
  resolve: {
    alias: {
    '@app': path.resolve(__dirname, './src/app/App'),
    '@pages': path.resolve(__dirname, './src/pages/index'),
    '@widgets': path.resolve(__dirname, './src/widgets/index'),
    '@features': path.resolve(__dirname, './src/features/index'),
    '@entities': path.resolve(__dirname, './src/entities/index'),
    '@shared': path.resolve(__dirname, './src/shared/index'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/shared/config/variables.scss" as *;`,
      },
    },
  },
})
