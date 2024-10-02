import { RequestHandler } from "express";
import { Item } from "../models/inventrua";
import { User } from "../models/user";
import { verifyUser } from "../services/authService";

export const getAllItems: RequestHandler = async (req, res) => {
    const { checkedOutBy } = req.query; // Destructure to get `checkedOutBy` from query params
  
    let items;
  
    if (typeof checkedOutBy === 'string') {
      const userId = parseInt(checkedOutBy, 10); // Parse string to integer
      
      // Check if userId is a valid number before using it in the query
      if (!isNaN(userId)) {
        items = await Item.findAll({ where: { checkedOutBy: userId } }); // Use userId in the query
      } else {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
    } else {
      items = await Item.findAll({
        include:  'CheckedOutUser'
      }); // If no filter, get all items
    }
  
    res.status(200).json(items);
  };

export const createItem: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);


    if (!user) {
        return res.status(403).send();
    }

    let newMessage: Item = req.body;
    newMessage.userId = user.userId

    if (newMessage.name && newMessage.catagory && newMessage.itemImg) {
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

export const checkoutItem: RequestHandler = async (req, res) => {
    const itemId = req.params.itemId;
    const user: User | null = await verifyUser(req);
  
    if (!user) {
      return res.status(403).json({ message: 'User not authenticated' });
    }
  
    const item = await Item.findByPk(itemId);
  
    if (item) {
      if (item.available) {
        item.available = false;         // Mark item as unavailable
        item.checkedOutBy = user.userId; // Set the current user as the one who checked it out
        await item.save();
        res.status(200).json(item);
      } else {
        res.status(400).json({ message: 'Item is already checked out' });
      }
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  };
  
  export const returnItem: RequestHandler = async (req, res) => {
    const itemId = req.params.itemId;
    const user: User | null = await verifyUser(req);
  
    if (!user) {
      return res.status(403).json({ message: 'User not authenticated' });
    }
  
    const item = await Item.findByPk(itemId);
  
    if (item) {
      if (item.checkedOutBy === user.userId) { // Ensure only the user who checked it out can return it
        item.available = true;
        item.checkedOutBy = user.userId;
        await item.save();
        res.status(200).json(item);
      } else {
        res.status(403).json({ message: 'You cannot return an item you did not check out' });
      }
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  };

export const upload: RequestHandler = async (req, res, next) => {
    
}