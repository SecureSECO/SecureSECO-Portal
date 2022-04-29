import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'lisk-client': path.resolve(
        __dirname,
        './node_modules/@liskhq/lisk-client/dist-browser/index.min.js',
      ),
    },
  },
  setupFiles: ['../../src/main.ts'],
});
