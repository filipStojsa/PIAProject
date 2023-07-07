import express from 'express'
import { AgencyController } from '../controllers/agency.controller';

const agencyRouter = express.Router();

agencyRouter.route('/checkIsUsernameUnique').post(
    (req, res)=>new AgencyController().checkIsUsernameUnique(req, res)
)

agencyRouter.route('/checkIsEmailUnique').post(
    (req, res)=>new AgencyController().checkIsEmailUnique(req, res)
)

agencyRouter.route('/login').post(
    (req, res)=>new AgencyController().login(req, res)
)

agencyRouter.route('/register').post(
    (req, res)=>new AgencyController().register(req, res)
)

agencyRouter.route('/addComment').post(
    (req, res)=>new AgencyController().addComment(req, res)
)

agencyRouter.route('/editComment').post(
    (req, res)=>new AgencyController().editComment(req, res)
)

agencyRouter.route('/modifyAgencyField').post(
    (req, res)=>new AgencyController().modifyAgencyField(req, res)
)

agencyRouter.route('/deleteAgency').post(
    (req, res)=>new AgencyController().deleteAgency(req, res)
)

agencyRouter.route('/getAllAgencies').get(
    (req, res)=>new AgencyController().getAllAgencies(req, res)
)


export default agencyRouter;