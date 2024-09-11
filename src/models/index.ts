import { Sequelize } from "sequelize";
import { AssociateUserItem, ItemFactory } from "./inventrua";
import { UserFactory } from "./user";

const dbName = 'Inventory';
const username = 'root';
const password = '';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

ItemFactory(sequelize);
UserFactory(sequelize);
AssociateUserItem();

export const db = sequelize;