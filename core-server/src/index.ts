import fs from 'fs';
import https from 'https';
import express from 'express';
import apiRoutes from '@/api/routes';

const app = express();
const PORT = 3000;
const options = {
  key: fs.readFileSync('../cert/localhost-key.pem'),
  cert: fs.readFileSync('../cert/localhost.pem'),
};

app.use(express.json());

app.use('/api', apiRoutes);

https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
