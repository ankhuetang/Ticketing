import express, {Request, Response} from 'express'
import { body, validationResult } from 'express-validator';
import { User } from '../models/users';
import { RequestValidationError } from '../../errors/request-validation-error';
import { BadRequestError } from '../../errors/bad-request.error';

const router = express.Router()

//use middleware from express-validator
router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min: 4, max: 20}).withMessage('Passwrod must be between 4 and 20 chars')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const {email, password} = req.body;
    //hash password here
    const existingUser = await User.findOne({email});
    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build({email, password})
    await user.save()
    res.status(201).send(user);
    //send back a jwt token here

})

export {router as signupRouter};