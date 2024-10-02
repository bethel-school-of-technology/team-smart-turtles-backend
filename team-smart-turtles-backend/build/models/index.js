"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const inventrua_1 = require("./inventrua");
const user_1 = require("./user");
const dbName = 'Inventory';
const username = 'root';
const password = 'Password1!';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
(0, inventrua_1.ItemFactory)(sequelize);
(0, user_1.UserFactory)(sequelize);
(0, inventrua_1.AssociateUserItem)();
exports.db = sequelize;
