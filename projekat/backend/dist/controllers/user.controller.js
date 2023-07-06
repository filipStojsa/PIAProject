"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const agency_1 = __importDefault(require("../models/agency"));
const admin_1 = __importDefault(require("../models/admin"));
class UserController {
    constructor() {
        // Login for both User and Agency
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        res.json({
                            "user": user,
                            "type": "user"
                        });
                    }
                    else {
                        agency_1.default.findOne({ 'username': username, 'password': password }, (err1, agency) => {
                            if (err1)
                                console.log(err1);
                            else {
                                if (agency) {
                                    res.json({
                                        "agency": agency,
                                        "type": "agency"
                                    });
                                }
                                else {
                                    admin_1.default.findOne({ 'username': username, 'password': password }, (err2, admin) => {
                                        if (err2)
                                            console.log(err2);
                                        else {
                                            if (admin) {
                                                res.json({
                                                    "admin": admin,
                                                    "type": "admin"
                                                });
                                            }
                                            else {
                                                res.json({
                                                    "type": "error"
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.register = (req, res) => {
            let name = req.body.name;
            let surname = req.body.surname;
            let tel = req.body.tel;
            let email = req.body.email;
            let image = req.body.image;
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.insertMany([{
                    name: name,
                    surname: surname,
                    tel: tel,
                    email: email,
                    image: image,
                    username: username,
                    password: password
                }]);
            res.json({ 'msg': 'OK' });
        };
        this.checkIsUsernameUnique = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                console.log(user);
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        res.json({ 'msg': 'false' });
                    }
                    else {
                        res.json({ 'msg': 'true' });
                    }
                }
            });
        };
        this.checkIsEmailUnique = (req, res) => {
            let email = req.body.email;
            user_1.default.findOne({ 'email': email }, (err, user) => {
                console.log(user);
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        res.json({ 'msg': 'false' });
                    }
                    else {
                        res.json({ 'msg': 'true' });
                    }
                }
            });
        };
        this.get = (req, res) => {
            // throw new Error('Method not implemented.')
            console.log('get');
            res.json({ 'msg': 'ok' });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map