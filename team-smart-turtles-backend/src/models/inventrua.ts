import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
  declare itemId: number;
  declare name: string;
  declare catagory: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare available: boolean;
  declare itemImg: string;
  declare userId?: number;
  declare checkedOutBy?: number; // Add this field to store the ID of the user who checked out the item
}

export function ItemFactory(sequelize: Sequelize) {
  Item.init({
    itemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    catagory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    itemImg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    checkedOutBy: {
      type: DataTypes.INTEGER,
      allowNull: true, // Make it nullable since the item may not always be checked out
    },
  }, {
    tableName: 'Inventory',
    freezeTableName: true,
    sequelize
  });
}

export function AssociateUserItem() {
  User.hasMany(Item, { foreignKey: 'userId' });  // Ownership relation (creator of item)
  Item.belongsTo(User, { foreignKey: 'userId' });

  // Add association for checkedOutBy
  User.hasMany(Item, { foreignKey: 'checkedOutBy', as: 'CheckedOutItems' });
  Item.belongsTo(User, { foreignKey: 'checkedOutBy', as: 'CheckedOutUser' });
}