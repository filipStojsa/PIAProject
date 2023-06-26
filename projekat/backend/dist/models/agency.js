"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Agency = new Schema({
    agencyName: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    adress: {
        type: String
    },
    pib: {
        type: String
    },
    description: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    tel: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    },
    comments: {
        type: Array
    },
});
exports.default = mongoose_1.default.model('AgencyModel', Agency, 'agency');
//# sourceMappingURL=agency.js.map