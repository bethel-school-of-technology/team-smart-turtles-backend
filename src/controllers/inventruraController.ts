import { RequestHandler } from "express";
import { Item } from "../models/inventrua";
import { User } from "../models/user";
import { verifyUser } from "../services/authService";

export const getAllItems: RequestHandler = async (req, res, next) => {
    let itens = await Item.findAll();
    res.status(200).json(itens);
};

export const createItem: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);


    if (!user) {
        return res.status(403).send();
    }

    let newMessage: Item = req.body;
    newMessage.userId = user.userId

    if (newMessage.name && newMessage.available && newMessage.catagory && newMessage.itemImg) {
        let created = await Item.create(newMessage);
        res.status(201).json(created);
    } else {
        res.status(400).send();
    }
}


export const getItem: RequestHandler = async (req, res, next) => {
    let itemId = req.params.itemId;

    let itemFound = await Item.findByPk(itemId);
    if (itemFound) {
        res.status(200).json(itemFound);
    }
    else {
        res.status(404).json();
    }
}



export const updateItem: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);


    if (!user) {
        return res.status(403).send();
    }
    
    let itemId = req.params.itemId;
    let newItem: Item = req.body;
    newItem.userId = user.userId;

    let messageFound = await Item.findByPk(itemId);
    try {
        await Item.update(newItem, {
            where: { itemId: itemId }
        });
        res.status(200).json();
    } catch {
        res.status(400).json();
    }



}

export const deleteItem: RequestHandler = async (req, res, next) => {
 
   
    let itemId = req.params.itemId;


    let itemFound = await Item.findByPk(itemId);

    if (itemFound) {
        await Item.destroy({
            where: { itemId: itemId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}

export const upload: RequestHandler = async (req, res, next) => {
    
}