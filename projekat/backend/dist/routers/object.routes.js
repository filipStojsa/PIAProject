"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const object_controller_1 = require("../controllers/object.controller");
const objectRouter = express_1.default.Router();
objectRouter.route('/addObject').post((req, res) => new object_controller_1.ObjectController().addObject(req, res));
objectRouter.route('/get').get((req, res) => new object_controller_1.ObjectController().get(req, res));
objectRouter.route('/getMyObjects/:username').get((req, res) => new object_controller_1.ObjectController().getMyObjects(req, res));
objectRouter.route('/addJob').post((req, res) => new object_controller_1.ObjectController().addJob(req, res));
objectRouter.route('/getObject/:id').get((req, res) => new object_controller_1.ObjectController().getObject(req, res));
exports.default = objectRouter;
//# sourceMappingURL=object.routes.js.map