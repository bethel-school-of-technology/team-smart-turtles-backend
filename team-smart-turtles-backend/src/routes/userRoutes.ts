import { Router } from 'express';
import { createUser, getAllUsers, getCurrentUser, getUser, loginUser } from '../controllers/userController';

const router = Router();

router.get('/ADMIN-GET', getAllUsers)
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/currentUser', getCurrentUser);
router.get('/profile/:id', getUser);

export default router;