import { Router } from 'express';
import { StudentController } from '../controllers/studentController.js';

const router = Router();

router.get('/students', StudentController.getAll);
router.get('/students/stats', StudentController.getStats);
router.get('/students/:id', StudentController.getById);
router.post('/students', StudentController.create);
router.delete('/students/:id', StudentController.delete);

export default router;