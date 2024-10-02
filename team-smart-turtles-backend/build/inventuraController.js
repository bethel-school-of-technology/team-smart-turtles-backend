"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.addItem = exports.allItems = void 0;
const inventory_1 = require("./models/inventory");
const allItems = async (req, res, next) => {
    let itemList = await inventory_1.Item.findAll();
};
exports.allItems = allItems;
const addItem = async (req, res, next) => {
    let newItem = req.body;
    await inventory_1.Item.create(newItem);
};
exports.addItem = addItem;
const updateItem = async (req, res, next) => {
    let InvenId = req.params.inventoryId;
    let updatedItem = req.body;
    let updated = await inventory_1.Item.update(updatedItem, {
        where: { itemId: InvenId }
    });
};
exports.updateItem = updateItem;
const deleteItem = async (req, res, next) => {
    let InvenId2 = req.params.itemId;
    let deleted = await inventory_1.Item.destroy({
        where: { itemId: InvenId2 }
    });
};
exports.deleteItem = deleteItem;
