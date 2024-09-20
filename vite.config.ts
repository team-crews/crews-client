import { sentryVitePlugin } from '@sentry/vite-plugin';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePluginRadar } from 'vite-plugin-radar';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    VitePluginRadar({
      analytics: { id: process.env.VITE_GA_ID! },
    }),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      sourcemaps: {
        assets: './dist/**',
        filesToDeleteAfterUpload: './dist/**/*.map', // 추가된 옵션
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    sourcemap: true,
  },
});
