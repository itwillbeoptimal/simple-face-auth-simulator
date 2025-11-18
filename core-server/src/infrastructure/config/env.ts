import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootEnvPath = path.resolve(__dirname, '../../../../.env');
const localEnvPath = path.resolve(__dirname, '../../../.env');

dotenv.config({ path: rootEnvPath });
dotenv.config({ path: localEnvPath });

const HOST_IP = process.env.HOST_IP!;
const AI_SERVER_PORT = process.env.AI_SERVER_PORT!;
const WEB_CLIENT_PORT = process.env.WEB_CLIENT_PORT!;

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: Number(process.env.JWT_EXPIRES_IN!),
  },
  refreshToken: {
    expiryDays: 30,
  },
  aiServer: {
    url: `https://${HOST_IP}:${AI_SERVER_PORT}`,
  },
  webClient: {
    url: `https://${HOST_IP}:${WEB_CLIENT_PORT}`,
  },
} as const;
