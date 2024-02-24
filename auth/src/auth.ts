import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from 'mongoose';

import { currentuserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/siginout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from '../errors/not-found-error';

const app = express();
app.use(json());

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('connected to mongodb');
    } catch(err) {
        console.error(err);
    }
    
}

app.listen(3000, () => {
    console.log('auth on 3000!!');
})

start();