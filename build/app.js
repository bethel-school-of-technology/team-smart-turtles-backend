"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.status(404).send("This is not the URL you are looking for!");
});
models_1.db.sync().then(() => {
    console.info("connected to the database!");
});
app.listen(3000);
