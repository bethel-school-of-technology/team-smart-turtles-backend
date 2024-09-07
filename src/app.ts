import express, { NextFunction, Request, Response } from 'express'
import { db } from './models';

const app = express();


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("This is not the URL you are looking for!")
})

db.sync().then(() => {
    console.info("connected to the database!")
});

app.listen(3000);