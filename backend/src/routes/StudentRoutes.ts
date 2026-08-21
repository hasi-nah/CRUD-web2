import { Router } from 'express'; 
import { StudentController } from '../controllers/StudentController.js'; 

const router = Router(); 

router.get('/', StudentController.getAll);
router.get('/stats', StudentController.getStats); 
router.get('/:id', StudentController.getById);
router.post('/', StudentController.create); 
router.delete('/:id', StudentController.delete); 

export default router; 