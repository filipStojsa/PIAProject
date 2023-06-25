import express from 'express'
import { AgencyController } from '../controllers/agency.controller';

const userRouter = express.Router();

userRouter.route('/checkIsUsernameUnique').post(
    (req, res)=>new AgencyController().checkIsUsernameUnique(req, res)
)

userRouter.route('/checkIsEmailUnique').post(
    (req, res)=>new AgencyController().checkIsEmailUnique(req, res)
)

userRouter.route('/login').post(
    (req, res)=>new AgencyController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new AgencyController().register(req, res)
)


export default userRouter;