"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agency_controller_1 = require("../controllers/agency.controller");
const agencyRouter = express_1.default.Router();
agencyRouter.route('/checkIsUsernameUnique').post((req, res) => new agency_controller_1.AgencyController().checkIsUsernameUnique(req, res));
agencyRouter.route('/checkIsEmailUnique').post((req, res) => new agency_controller_1.AgencyController().checkIsEmailUnique(req, res));
agencyRouter.route('/login').post((req, res) => new agency_controller_1.AgencyController().login(req, res));
agencyRouter.route('/register').post((req, res) => new agency_controller_1.AgencyController().register(req, res));
agencyRouter.route('/addComment').post((req, res) => new agency_controller_1.AgencyController().addComment(req, res));
agencyRouter.route('/editComment').post((req, res) => new agency_controller_1.AgencyController().editComment(req, res));
agencyRouter.route('/getAllAgencies').get((req, res) => new agency_controller_1.AgencyController().getAllAgencies(req, res));
exports.default = agencyRouter;
//# sourceMappingURL=agency.routes.js.map