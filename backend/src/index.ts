import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv'; 
import { AuthController } from './controllers/AuthController.js';
import { apiKeyMiddleware } from './security/auth.js';
import studentRoutes from './routes/StudentRoutes.js';

dotenv.config(); 

const app = express();

app.use(cors()); 
app.use(express.json()); 
app.post('/api/login', AuthController.login);

app.use('/api/students', apiKeyMiddleware, studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});