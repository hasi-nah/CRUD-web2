import express from 'express';
import dotenv from 'dotenv';
import { AuthController } from './controllers/authController.js';
import { apiKeyMiddleware, jwtMiddleware } from './security/auth.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());


app.post('/api/login', AuthController.login);


app.use('/api', apiKeyMiddleware, jwtMiddleware, studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});