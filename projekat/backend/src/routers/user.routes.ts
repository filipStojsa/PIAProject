import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/checkIsUsernameUnique').post(
    (req, res)=>new UserController().checkIsUsernameUnique(req, res)
)

userRouter.route('/checkIsEmailUnique').post(
    (req, res)=>new UserController().checkIsEmailUnique(req, res)
)

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/get').get(
    (req, res)=>new UserController().get(req, res)
)


export default userRouter;