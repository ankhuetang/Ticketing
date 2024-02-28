import express from 'express'
import { requireAuth } from '../middlewares/require-auth';

import { currentUser } from '../middlewares/current-user-middleware';
const router = express.Router()

//this route to answer if a user is loggedin or not
router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
   //after the currentUser middleware set req.currentUser = payload in cookie
    res.send({currentUser: req.currentUser || null})
})

export {router as currentuserRouter};