import express from 'express'
import { ObjectController } from '../controllers/object.controller';

const objectRouter = express.Router();

objectRouter.route('/addObject').post(
    (req, res) => new ObjectController().addObject(req, res)
)

objectRouter.route('/get').get(
    (req, res) => new ObjectController().get(req, res)
)

objectRouter.route('/getMyObjects/:username').get(
    (req, res) => new ObjectController().getMyObjects(req, res)
)

objectRouter.route('/getMyJobs/:username').get(
    (req, res) => new ObjectController().getMyJobs(req, res)
)

objectRouter.route('/addJob').post(
    (req, res) => new ObjectController().addJob(req, res)
)

objectRouter.route('/getObject/:id').get(
    (req, res) => new ObjectController().getObject(req, res)
)

objectRouter.route('/getJob/:id').get(
    (req, res) => new ObjectController().getJob(req, res)
)

export default objectRouter;