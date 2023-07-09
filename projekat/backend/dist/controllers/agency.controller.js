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
        this.getAgency = (req, res) => {
            let username = req.params.agencyUsername;
            agency_1.default.findOne({ 'username': username }, (err, agency) => {
                console.log(agency);
                if (err)
                    console.log(err);
                else {
                    if (agency) {
                        res.json(agency);
                    }
                }
            });
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
            let tel = req.body.tel;
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
                    status: 'pending',
                    workers: '0',
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
            let email = req.body.email;
            agency_1.default.findOne({ 'email': email }, (err, agency) => {
                console.log(agency);
                if (err)
                    console.log(err);
                else {
                    if (agency) {
                        res.json({ 'msg': 'false' });
                    }
                    else {
                        res.json({ 'msg': 'true' });
                    }
                }
            });
        };
        this.getAllAgencies = (req, res) => {
            agency_1.default.find({}, (err, agencies) => {
                if (err)
                    console.log(err);
                else {
                    if (agencies) {
                        console.log('Found some agencies...');
                        res.json(agencies);
                    }
                }
            });
        };
        this.addComment = (req, res) => {
            let agencyUsername = req.body.agencyId;
            let commentText = req.body.comment;
            let user = req.body.user;
            let username = req.body.username;
            let rating = req.body.rating;
            agency_1.default.findOne({ 'username': agencyUsername }, (err, agency) => {
                if (err)
                    console.log(err);
                else {
                    if (agency) {
                        let comment = {
                            user: user,
                            rating: rating,
                            comment: commentText,
                            username: username
                        };
                        agency_1.default.updateOne({ 'username': agencyUsername }, { $push: { 'comments': comment } }, (err, response) => {
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
        this.editComment = (req, res) => {
            let agencyUsername = req.body.agencyUsername;
            let commentText = req.body.comment;
            let rating = req.body.rating;
            let commentIndex = req.body.index;
            console.log('Comm - ' + commentText);
            console.log('Rating - ' + rating);
            agency_1.default.findOne({ 'username': agencyUsername }, (err, agency) => {
                if (err)
                    console.log(err);
                else {
                    if (agency) {
                        agency_1.default.updateOne({ 'username': agencyUsername }, { $set: {
                                [`comments.${commentIndex}.rating`]: rating,
                                [`comments.${commentIndex}.comment`]: commentText,
                            } }, (err, response) => {
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
        this.deleteComment = (req, res) => {
            let agencyUsername = req.body.agencyUsername;
            let commentIndex = req.body.index;
            agency_1.default.findOne({ 'username': agencyUsername }, (err, agency) => {
                if (err)
                    console.log(err);
                else {
                    if (agency) {
                        agency_1.default.updateOne({ 'username': agencyUsername }, { $unset: {
                                [`comments.${commentIndex}`]: ""
                            } }, (err, response) => {
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
        this.modifyAgencyField = (req, res) => {
            let field = req.body.field;
            let value = req.body.value;
            let username = req.body.username;
            agency_1.default.findOne({ 'username': username }, (err, user) => {
                console.log(user);
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        agency_1.default.updateOne({ 'username': username }, { $set: { [field]: value } }, (err, resp) => {
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
        this.deleteAgency = (req, res) => {
            let username = req.body.username;
            agency_1.default.deleteOne({ 'username': username }, (err, result) => {
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
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map