"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agency_controller_1 = require("../controllers/agency.controller");
const userRouter = express_1.default.Router();
userRouter.route('/checkIsUsernameUnique').post((req, res) => new agency_controller_1.AgencyController().checkIsUsernameUnique(req, res));
userRouter.route('/checkIsEmailUnique').post((req, res) => new agency_controller_1.AgencyController().checkIsEmailUnique(req, res));
userRouter.route('/login').post((req, res) => new agency_controller_1.AgencyController().login(req, res));
userRouter.route('/register').post((req, res) => new agency_controller_1.AgencyController().register(req, res));
exports.default = userRouter;
//# sourceMappingURL=agency.routes.js.map