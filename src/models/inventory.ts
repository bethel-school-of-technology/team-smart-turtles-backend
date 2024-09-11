import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, } from "sequelize";


export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>>{
    declare itemId: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare available: boolean;

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
    }, {
        tableName: 'Inventory',
        freezeTableName: true,
        sequelize
    });
}