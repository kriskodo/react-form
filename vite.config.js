// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@Src', replacement: resolve(__dirname, 'src') },
      { find: '@Components', replacement: resolve(__dirname, 'src/components') },
      { find: '@Context', replacement: resolve(__dirname, 'src/context') },
      { find: '@Hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@Utils', replacement: resolve(__dirname, 'src/utils') },
    ],
  },
});
