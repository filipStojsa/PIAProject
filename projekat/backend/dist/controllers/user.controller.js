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
                        if (user.status == 'ok') {
                            res.json({
                                "user": user,
                                "type": "user"
                            });
                        }
                        else {
                            res.json({
                                "type": "notGranted"
                            });
                        }
                    }
                    else {
                        agency_1.default.findOne({ 'username': username, 'password': password }, (err1, agency) => {
                            if (err1)
                                console.log(err1);
                            else {
                                if (agency) {
                                    if (agency.status == 'ok') {
                                        res.json({
                                            "agency": agency,
                                            "type": "agency"
                                        });
                                    }
                                    else {
                                        res.json({
                                            "type": "notGranted"
                                        });
                                    }
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
                    password: password,
                    status: 'pending'
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
            console.log('get all users...');
            user_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    res.json(users);
                }
            });
        };
        this.modifyUserField = (req, res) => {
            let field = req.body.field;
            let value = req.body.value;
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                console.log(user);
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        user_1.default.updateOne({ 'username': username }, { $set: { [field]: value } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else {
                                res.json({ 'msg': 'ok' });
                            }
                        });
                    }
                    else {
                        res.json({ 'msg': 'notFound' });
                    }
                }
            });
        };
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            user_1.default.deleteOne({ 'username': username }, (err, result) => {
                if (err)
                    console.error(err);
                if (result.deletedCount === 0) {
                    return res.status(404).json({ 'msg': 'notFound' });
                }
                res.json({ 'msg': 'ok' });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map