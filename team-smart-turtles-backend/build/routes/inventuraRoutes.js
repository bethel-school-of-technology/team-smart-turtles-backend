"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventruraController_1 = require("../controllers/inventruraController");
const router = (0, express_1.Router)();
router.get('/', inventruraController_1.getAllItems);
router.post('/create', inventruraController_1.createItem);
router.get('/:itemId', inventruraController_1.getItem);
router.put('/update/:itemId', inventruraController_1.updateItem);
router.delete('/ADMIN_DELETE/:itemId', inventruraController_1.deleteItem);
router.post('/checkout/:itemId', inventruraController_1.checkoutItem); // Add a new route to handle checkout functionality
router.post('/return/:itemId', inventruraController_1.returnItem);
exports.default = router;
