"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.deleteItem = exports.updateItem = exports.getItem = exports.createItem = exports.getAllItems = void 0;
const inventrua_1 = require("../models/inventrua");
const authService_1 = require("../services/authService");
const getAllItems = async (req, res, next) => {
    let itens = await inventrua_1.Item.findAll();
    res.status(200).json(itens);
};
exports.getAllItems = getAllItems;
const createItem = async (req, res, next) => {
    let user = await (0, authService_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newMessage = req.body;
    newMessage.userId = user.userId;
    if (newMessage.name && newMessage.available && newMessage.catagory && newMessage.itemImg) {
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
const upload = async (req, res, next) => {
};
exports.upload = upload;
