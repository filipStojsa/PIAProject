"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectController = void 0;
const object_1 = __importDefault(require("../models/object"));
class ObjectController {
    constructor() {
        this.get = (req, res) => {
            // throw new Error('Method not implemented.')
            console.log('get');
            res.json({ 'msg': 'ok' });
        };
        this.addObject = (req, res) => {
            // throw new Error('Method not implemented.')
            console.log('addObject called');
            let type = req.body.type;
            let address = req.body.address;
            let num = req.body.num;
            let area = req.body.area;
            let user = req.body.user;
            let status = req.body.status;
            let rooms = req.body.rooms;
            console.log(rooms);
            object_1.default.insertMany([{
                    type: type,
                    address: address,
                    num: num,
                    area: area,
                    user: user,
                    status: status,
                    rooms: rooms
                }]);
            res.json({ 'msg': 'ok' });
        };
    }
}
exports.ObjectController = ObjectController;
//# sourceMappingURL=object.controller.js.map