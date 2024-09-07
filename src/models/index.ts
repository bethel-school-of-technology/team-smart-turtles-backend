import { Sequelize } from "sequelize";
import { ItemFactory } from "./inventory";

const dbName = 'Inventory';
const username = 'root';
const password= '';


const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

ItemFactory(sequelize);

export const db = sequelize;

// import { Sequelize } from "sequelize";
// import { ItemFactory } from "./inventory";

// const dbName = 'Inventory';
// const username = 'root';
// const password= '';

// // Change this line:
// const sequelize = new Sequelize(dbName, username, password, {
//     host: 'localhost',
//     port: 3306,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 3600
//     },
//     operatorsAliases: {
//         $eq: '=',
//         $neq: '<>',
//         $like: 'LIKE',
//         $notLike: 'NOT LIKE',
//         $gt: '> ',
//         $lt: '< ',
//         $gte: '>=',
//         $lte: '<=',
//         $between: 'BETWEEN',
//         $notBetween: 'NOT BETWEEN',
//         $in: 'IN',
//         $notIn: 'NOT IN',
//         $or: 'OR',
//         $and: 'AND',
//         $not: 'NOT'
//     },
//     logging: false // Disable logging for production
// });

// ItemFactory(sequelize);

// export const db = sequelize;