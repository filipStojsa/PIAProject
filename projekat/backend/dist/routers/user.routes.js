"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/checkIsUsernameUnique').post((req, res) => new user_controller_1.UserController().checkIsUsernameUnique(req, res));
userRouter.route('/checkIsEmailUnique').post((req, res) => new user_controller_1.UserController().checkIsEmailUnique(req, res));
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/modifyUserField').post((req, res) => new user_controller_1.UserController().modifyUserField(req, res));
userRouter.route('/deleteUser').post((req, res) => new user_controller_1.UserController().deleteUser(req, res));
userRouter.route('/get').get((req, res) => new user_controller_1.UserController().get(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map