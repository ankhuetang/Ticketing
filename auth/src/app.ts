import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';

import { currentuserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/siginout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from '../errors/not-found-error';

const app = express();
app.set('trust proxy', true); //bc traffic is proxied to this server thru ingress nginx
app.use(json());
app.use(cookieSession({
    signed: false, //disable encryption
    //require HTTPS connection when not in test mode
    secure: process.env.NODE_ENV !== 'test' //when running test, jest sets NODE_ENV='test'
}))

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};