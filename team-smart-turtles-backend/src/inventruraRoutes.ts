import { Router } from "express";
import { addItem, allItems,  deleteItem,  updateItem } from "./inventuraController";

const router = Router();

router.get('/', allItems);

router.post('/ADMIN-CREATE', addItem);

router.put('/:itemId', updateItem);

router.delete('/ADMIN/:itemId', deleteItem);

export default router;



