"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemFactory = exports.Item = void 0;
const sequelize_1 = require("sequelize");
class Item extends sequelize_1.Model {
}
exports.Item = Item;
function ItemFactory(sequelize) {
    Item.init({ itemId: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        available: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        tableName: 'Inventory',
        freezeTableName: true,
        sequelize
    });
}
exports.ItemFactory = ItemFactory;
