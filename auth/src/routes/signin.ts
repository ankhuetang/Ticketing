import express, {Request, Response} from 'express'
import {body} from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/users';
import { validateRequest } from '../middlewares/validate-request';
import { Password } from '../services/password';
import { BadRequestError } from '../../errors/bad-request.error';

const router = express.Router()

router.post('/api/users/signin', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must not be empty')
], validateRequest, async (req: Request, res: Response) => {
    
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});
    if (!existingUser) {
        throw new BadRequestError('Double check your email and password');
    }

    const info = {
        passwordDb: existingUser.password,
        emailDb: existingUser.email,
        idDb: existingUser.id,
    }
    if (! await Password.compare(info.passwordDb, password)) {
        throw new BadRequestError('Password incorrect');
    }

    //generate jwt and store on session object
    const userJwt = jwt.sign({
        id: info.idDb,
        email: info.emailDb
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    };

    res.status(200).send(existingUser);
})

export {router as signinRouter};