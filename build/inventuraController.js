"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.addItem = exports.allItems = void 0;
const inventory_1 = require("./models/inventory");
const allItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let itemList = yield inventory_1.Item.findAll();
});
exports.allItems = allItems;
const addItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let newItem = req.body;
    yield inventory_1.Item.create(newItem);
});
exports.addItem = addItem;
const updateItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let InvenId = req.params.inventoryId;
    let updatedItem = req.body;
    let updated = yield inventory_1.Item.update(updatedItem, {
        where: { itemId: InvenId }
    });
});
exports.updateItem = updateItem;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let InvenId2 = req.params.itemId;
    let deleted = yield inventory_1.Item.destroy({
        where: { itemId: InvenId2 }
    });
});
exports.deleteItem = deleteItem;
