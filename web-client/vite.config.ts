import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const rootEnv = loadEnv(mode, path.resolve(__dirname, '..'), '');
  const HOST_IP = rootEnv.HOST_IP;
  const CORE_SERVER_PORT = rootEnv.CORE_SERVER_PORT;
  const AI_SERVER_PORT = rootEnv.AI_SERVER_PORT;
  const WEB_CLIENT_PORT = rootEnv.WEB_CLIENT_PORT;

  return {
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
      port: Number(WEB_CLIENT_PORT),
    },
    define: {
      'import.meta.env.VITE_CORE_SERVER_URL': JSON.stringify(`https://${HOST_IP}:${CORE_SERVER_PORT}`),
      'import.meta.env.VITE_AI_SERVER_WS_URL': JSON.stringify(`wss://${HOST_IP}:${AI_SERVER_PORT}`),
    },
    assetsInclude: ['**/*.lottie'],
  };
});
