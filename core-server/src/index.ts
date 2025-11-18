import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import express from 'express';
import apiRoutes from '@/api/routes';
import { config } from '@/infrastructure/config/env';
import { errorHandler, notFoundHandler } from '@/shared/middlewares/error-handler.middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.CORE_SERVER_PORT);

const options = {
  key: fs.readFileSync('../cert/localhost-key.pem'),
  cert: fs.readFileSync('../cert/localhost.pem'),
};

app.use(express.json());

app.use(
  cors({
    origin: config.webClient.url ? [config.webClient.url] : [],
    credentials: true,
  }),
);

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
