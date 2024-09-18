"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserItem = exports.ItemFactory = exports.Item = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
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
        catagory: {
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
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'Inventory',
        freezeTableName: true,
        sequelize
    });
}
exports.ItemFactory = ItemFactory;
function AssociateUserItem() {
    user_1.User.hasMany(Item, { foreignKey: 'userId' });
    Item.belongsTo(user_1.User, { foreignKey: 'userId' });
}
exports.AssociateUserItem = AssociateUserItem;
