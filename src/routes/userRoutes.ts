import { Router } from 'express';
import { createUser, getAllUsers, getUser, loginUser } from '../controllers/userController';

const router = Router();

router.get('/ADMIN-GET', getAllUsers)
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/:id', getUser);

export default router;