"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Objekat = new Schema({
    type: {
        type: String
    },
    address: {
        type: String
    },
    num: {
        type: Number
    },
    area: {
        type: Number
    },
    user: {
        type: String
    },
    status: {
        type: String
    },
    rooms: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('ObjekatModel', Objekat, 'objekat');
//# sourceMappingURL=object.js.map