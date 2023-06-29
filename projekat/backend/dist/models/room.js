"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Room = new Schema({
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    color: {
        type: String
    }
});
exports.default = mongoose_1.default.model('RoomModel', Room, 'room');
//# sourceMappingURL=room.js.map