import express from 'express'
import { ObjectController } from '../controllers/object.controller';

const objectRouter = express.Router();

objectRouter.route('/addObject').post(
    (req, res) => new ObjectController().addObject(req, res)
)

objectRouter.route('/get').get(
    (req, res) => new ObjectController().get(req, res)
)

export default objectRouter;