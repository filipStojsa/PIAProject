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

objectRouter.route('/getAgencyJobs/:agencyUsername').get(
    (req, res) => new ObjectController().getAgencyJobs(req, res)
)

objectRouter.route('/addJob').post(
    (req, res) => new ObjectController().addJob(req, res)
)

objectRouter.route('/makeAnOffer').post(
    (req, res) => new ObjectController().makeAnOffer(req, res)
)

objectRouter.route('/changeObjectsColor').post(
    (req, res) => new ObjectController().changeObjectsColor(req, res)
)

objectRouter.route('/getObject/:id').get(
    (req, res) => new ObjectController().getObject(req, res)
)

objectRouter.route('/getJob/:id').get(
    (req, res) => new ObjectController().getJob(req, res)
)

objectRouter.route('/payJob').post(
    (req, res) => new ObjectController().payJob(req, res)
)

objectRouter.route('/changeJobStatus').post(
    (req, res) => new ObjectController().changeJobStatus(req, res)
)

export default objectRouter;