import { RequestHandler } from "express";
import { Item } from "./models/inventory";

export const allItems: RequestHandler = async (req, res, next) => {
    let itemList: Item[] = await Item.findAll();
};

export const addItem: RequestHandler = async (req, res, next) => {
    let newItem: Item = req.body;
    await Item.create(newItem);
};

export const updateItem: RequestHandler = async (req, res, next) => {
    let InvenId = req.params.inventoryId;
    let updatedItem: Item = req.body
    
    let updated = await Item.update(updatedItem, {
        where: { itemId: InvenId }
    });
};

export const deleteItem: RequestHandler = async (req, res, next) => {
    let InvenId2 = req.params.itemId;

    let deleted = await Item.destroy({
        where: { itemId: InvenId2 }
    });
};





