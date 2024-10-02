"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.returnItem = exports.checkoutItem = exports.deleteItem = exports.updateItem = exports.getItem = exports.createItem = exports.getAllItems = void 0;
const inventrua_1 = require("../models/inventrua");
const authService_1 = require("../services/authService");
const getAllItems = async (req, res) => {
    const { checkedOutBy } = req.query; // Destructure to get `checkedOutBy` from query params
    let items;
    if (typeof checkedOutBy === 'string') {
        const userId = parseInt(checkedOutBy, 10); // Parse string to integer
        // Check if userId is a valid number before using it in the query
        if (!isNaN(userId)) {
            items = await inventrua_1.Item.findAll({ where: { checkedOutBy: userId } }); // Use userId in the query
        }
        else {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
    }
    else {
        items = await inventrua_1.Item.findAll({
            include: 'CheckedOutUser'
        }); // If no filter, get all items
    }
    res.status(200).json(items);
};
exports.getAllItems = getAllItems;
const createItem = async (req, res, next) => {
    let user = await (0, authService_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newMessage = req.body;
    newMessage.userId = user.userId;
    if (newMessage.name && newMessage.catagory && newMessage.itemImg) {
        let created = await inventrua_1.Item.create(newMessage);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createItem = createItem;
const getItem = async (req, res, next) => {
    let itemId = req.params.itemId;
    let itemFound = await inventrua_1.Item.findByPk(itemId);
    if (itemFound) {
        res.status(200).json(itemFound);
    }
    else {
        res.status(404).json();
    }
};
exports.getItem = getItem;
const updateItem = async (req, res, next) => {
    let user = await (0, authService_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.itemId;
    let newItem = req.body;
    newItem.userId = user.userId;
    let messageFound = await inventrua_1.Item.findByPk(itemId);
    try {
        await inventrua_1.Item.update(newItem, {
            where: { itemId: itemId }
        });
        res.status(200).json();
    }
    catch {
        res.status(400).json();
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res, next) => {
    let itemId = req.params.itemId;
    let itemFound = await inventrua_1.Item.findByPk(itemId);
    if (itemFound) {
        await inventrua_1.Item.destroy({
            where: { itemId: itemId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteItem = deleteItem;
const checkoutItem = async (req, res) => {
    const itemId = req.params.itemId;
    const user = await (0, authService_1.verifyUser)(req);
    if (!user) {
        return res.status(403).json({ message: 'User not authenticated' });
    }
    const item = await inventrua_1.Item.findByPk(itemId);
    if (item) {
        if (item.available) {
            item.available = false; // Mark item as unavailable
            item.checkedOutBy = user.userId; // Set the current user as the one who checked it out
            await item.save();
            res.status(200).json(item);
        }
        else {
            res.status(400).json({ message: 'Item is already checked out' });
        }
    }
    else {
        res.status(404).json({ message: 'Item not found' });
    }
};
exports.checkoutItem = checkoutItem;
const returnItem = async (req, res) => {
    const itemId = req.params.itemId;
    const user = await (0, authService_1.verifyUser)(req);
    if (!user) {
        return res.status(403).json({ message: 'User not authenticated' });
    }
    const item = await inventrua_1.Item.findByPk(itemId);
    if (item) {
        if (item.checkedOutBy === user.userId) { // Ensure only the user who checked it out can return it
            item.available = true;
            item.checkedOutBy = user.userId;
            await item.save();
            res.status(200).json(item);
        }
        else {
            res.status(403).json({ message: 'You cannot return an item you did not check out' });
        }
    }
    else {
        res.status(404).json({ message: 'Item not found' });
    }
};
exports.returnItem = returnItem;
const upload = async (req, res, next) => {
};
exports.upload = upload;
