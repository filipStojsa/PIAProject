"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectController = void 0;
const object_1 = __importDefault(require("../models/object"));
const job_1 = __importDefault(require("../models/job"));
class ObjectController {
    constructor() {
        this.get = (req, res) => {
            // throw new Error('Method not implemented.')
            console.log("get");
            res.json({ msg: "ok" });
        };
        this.addObject = (req, res) => {
            // throw new Error('Method not implemented.')
            console.log("addObject called");
            let type = req.body.type;
            let address = req.body.address;
            let num = req.body.num;
            let area = req.body.area;
            let user = req.body.user;
            let status = req.body.status;
            let rooms = req.body.rooms;
            console.log(rooms);
            object_1.default.insertMany([
                {
                    type: type,
                    address: address,
                    num: num,
                    area: area,
                    user: user,
                    status: status,
                    rooms: rooms,
                },
            ]);
            res.json({ msg: "ok" });
        };
        this.getMyObjects = (req, res) => {
            let username = req.params.username;
            object_1.default.find({ "user": username })
                .then((objects) => {
                res.json(objects);
            })
                .catch((err) => {
                console.error("Failed to retrieve objects", err);
                res.status(500).json({ error: "Failed to retrieve objects" });
            });
        };
        this.getMyJobs = (req, res) => {
            let username = req.params.username;
            job_1.default.find({ "username": username })
                .then((jobs) => {
                res.json(jobs);
            })
                .catch((err) => {
                console.error("Failed to retrieve jobs", err);
                res.status(500).json({ error: "Failed to retrieve jobs" });
            });
        };
        this.addJob = (req, res) => {
            let objectsId = req.body.selectedObject;
            let agencyUsername = req.body.selectedAgency;
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let username = req.body.username;
            job_1.default.insertMany([{
                    username: username,
                    agencyUsername: agencyUsername,
                    jobStatus: 'pending',
                    object: objectsId,
                    start: startDate,
                    end: endDate
                }]);
            res.json({ 'msg': 'ok' });
        };
        this.getObject = (req, res) => {
            let _id = req.params.id;
            object_1.default.findOne({ _id })
                .then((objects) => {
                res.json(objects);
            })
                .catch((err) => {
                console.error("Failed to retrieve objects", err);
                res.status(500).json({ error: "Failed to retrieve objects" });
            });
        };
    }
}
exports.ObjectController = ObjectController;
//# sourceMappingURL=object.controller.js.map