"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const object_controller_1 = require("../controllers/object.controller");
const objectRouter = express_1.default.Router();
objectRouter.route('/addObject').post((req, res) => new object_controller_1.ObjectController().addObject(req, res));
objectRouter.route('/getAllJobs').get((req, res) => new object_controller_1.ObjectController().getAllJobs(req, res));
objectRouter.route('/getMyObjects/:username').get((req, res) => new object_controller_1.ObjectController().getMyObjects(req, res));
objectRouter.route('/getMyJobs/:username').get((req, res) => new object_controller_1.ObjectController().getMyJobs(req, res));
objectRouter.route('/getAgencyJobs/:agencyUsername').get((req, res) => new object_controller_1.ObjectController().getAgencyJobs(req, res));
objectRouter.route('/addJob').post((req, res) => new object_controller_1.ObjectController().addJob(req, res));
objectRouter.route('/makeAnOffer').post((req, res) => new object_controller_1.ObjectController().makeAnOffer(req, res));
objectRouter.route('/addJobWorkers').post((req, res) => new object_controller_1.ObjectController().addJobWorkers(req, res));
objectRouter.route('/changeObjectsColor').post((req, res) => new object_controller_1.ObjectController().changeObjectsColor(req, res));
objectRouter.route('/getObject/:id').get((req, res) => new object_controller_1.ObjectController().getObject(req, res));
objectRouter.route('/getJob/:id').get((req, res) => new object_controller_1.ObjectController().getJob(req, res));
objectRouter.route('/payJob').post((req, res) => new object_controller_1.ObjectController().payJob(req, res));
objectRouter.route('/changeJobStatus').post((req, res) => new object_controller_1.ObjectController().changeJobStatus(req, res));
exports.default = objectRouter;
//# sourceMappingURL=object.routes.js.map