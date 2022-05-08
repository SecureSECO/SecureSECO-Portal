import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'lisk-client': path.resolve(
        __dirname,
        './node_modules/@liskhq/lisk-client/dist-browser/index.min.js',
      ),
    },
  },
});
