import express from 'express';
import dotenv from 'dotenv';
// Importer le controller depuis le bon chemin (minuscule s)
import { StudentController } from './controllers/studentController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes CRUD - Utilise la classe StudentController partout
app.get('/students', StudentController.getAll);
app.get('/students/:id', StudentController.getById);
app.post('/students', StudentController.create);
app.delete('/students/:id', StudentController.delete);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});