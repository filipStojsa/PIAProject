"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const agency_1 = __importDefault(require("../models/agency"));
class AgencyController {
    constructor() {
        this.login = (req, res) => {
            // To be implemented...
            console.log('To be implemented...');
        };
        this.register = (req, res) => {
            let agencyName = req.body.agencyName;
            let state = req.body.state;
            let city = req.body.city;
            let adress = req.body.adress;
            let pib = req.body.pib;
            let description = req.body.description;
            let username = req.body.username;
            let password = req.body.password;
            let tel = req.body.password;
            let email = req.body.email;
            let image = req.body.image;
            agency_1.default.insertMany([{
                    agencyName: agencyName,
                    state: state,
                    city: city,
                    adress: adress,
                    pib: pib,
                    description: description,
                    username: username,
                    password: password,
                    tel: tel,
                    email: email,
                    image: image,
                    comments: []
                }]);
            res.json({ 'msg': 'OK' });
        };
        this.checkIsUsernameUnique = (req, res) => {
            let username = req.body.username;
            agency_1.default.findOne({ 'username': username }, (err, user) => {
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
            console.log('To be implemented...');
        };
        this.checkIsEmailUnique = (req, res) => {
            // To be implemented...
            console.log('To be implemented - checkIsEmailUnique...');
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map