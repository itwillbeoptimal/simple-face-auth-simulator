import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    svgrPlugin(),
    mkcert(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../cert/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../cert/localhost.pem')),
    },
  },
  assetsInclude: ['**/*.lottie'],
});
