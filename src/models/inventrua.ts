import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, TEXT, } from "sequelize";
import { User } from "./user";


export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>>{
    declare itemId: number;
    declare name: string;
    declare catagory: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare available: boolean;
    declare itemImg: string;
    declare userId: number;
    // declare usedBy: string;

}

export function ItemFactory(sequelize: Sequelize) {
    Item.init({  itemId: {
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
    }, {
        tableName: 'Inventory',
        freezeTableName: true,
        sequelize
    });
}

export function AssociateUserItem() {
  User.hasMany(Item, { foreignKey: 'userId' });
  Item.belongsTo(User, { foreignKey: 'userId' });
}


