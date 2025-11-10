import express from 'express';
import apiRoutes from '@/api/routes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
