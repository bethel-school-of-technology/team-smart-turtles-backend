import { Router } from 'express';
import { createItem, deleteItem, getAllItems, getItem, updateItem } from '../controllers/inventruraController';

const router = Router();

router.get('/', getAllItems);

router.post('/create', createItem);

router.get('/:itemId', getItem);

router.put('/update/:itemId', updateItem);

router.delete('/ADMIN_DELETE/:itemId', deleteItem);

export default router;