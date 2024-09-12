import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import { db } from './models';
import router from './routes/inventuraRoutes';
import userRoutes from './routes/userRoutes';
import session from 'express-session';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// routes
app.use('/api/items', router);
app.use('/api/user', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});



// Syncing our database
db.sync({ alter: true }).then(() => {
    console.info("connected to the database!")
});

app.listen(3000);