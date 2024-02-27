import express, {Request, Response} from 'express'
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/users';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request.error';

const router = express.Router()

//use middleware from express-validator
router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min: 4, max: 20}).withMessage('Passwrod must be between 4 and 20 chars')
], validateRequest, async (req: Request, res: Response) => {
    const {email, password} = req.body;
    //hash password here
    const existingUser = await User.findOne({email});
    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build({email, password})
    await user.save()

    //generate jwt and store on session object
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
    //send back a jwt token here

})

export {router as signupRouter};