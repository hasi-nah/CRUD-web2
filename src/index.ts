import express from 'express';
import dotenv from 'dotenv';
import { StudentController } from './controllers/studentController.js';
import { AuthController } from './controllers/authController.js';
import { apiKeyMiddleware, jwtMiddleware } from './security/auth.js';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/api/login', AuthController.login);


app.use('/api/students', apiKeyMiddleware, jwtMiddleware);


app.get('/api/students', StudentController.getAll);
app.get('/api/students/stats', StudentController.getStats);
app.get('/api/students/:id', StudentController.getById);
app.post('/api/students', StudentController.create);
app.delete('/api/students/:id', StudentController.delete);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en ligne sur le port ${PORT}`);
});