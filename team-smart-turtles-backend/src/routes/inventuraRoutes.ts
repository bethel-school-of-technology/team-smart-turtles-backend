import { Router } from 'express';
import { checkoutItem, createItem, deleteItem, getAllItems, getItem, returnItem, updateItem } from '../controllers/inventruraController';

const router = Router();

router.get('/', getAllItems);

router.post('/create', createItem);

router.get('/:itemId', getItem);

router.put('/update/:itemId', updateItem);

router.delete('/ADMIN_DELETE/:itemId', deleteItem);
router.post('/checkout/:itemId', checkoutItem); // Add a new route to handle checkout functionality
router.post('/return/:itemId', returnItem);  
export default router;