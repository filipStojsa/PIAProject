"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Job = new Schema({
    username: {
        type: String
    },
    agencyUsername: {
        type: String
    },
    jobStatus: {
        type: String
    },
    object: {
        type: Object
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    }
});
exports.default = mongoose_1.default.model('JobModel', Job, 'job');
//# sourceMappingURL=job.js.map