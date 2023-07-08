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
        this.getAllJobs = (req, res) => {
            job_1.default.find({}, (err, jobs) => {
                if (err)
                    console.log(err);
                else {
                    if (jobs) {
                        res.json(jobs);
                    }
                }
            });
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
            object_1.default.find({ user: username })
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
            job_1.default.find({ username: username })
                .then((jobs) => {
                res.json(jobs);
            })
                .catch((err) => {
                console.error("Failed to retrieve jobs", err);
                res.status(500).json({ error: "Failed to retrieve jobs" });
            });
        };
        this.getAgencyJobs = (req, res) => {
            let agencyUsername = req.params.agencyUsername;
            job_1.default.find({ agencyUsername: agencyUsername })
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
            job_1.default.insertMany([
                {
                    username: username,
                    agencyUsername: agencyUsername,
                    jobStatus: "pending",
                    object: objectsId,
                    start: startDate,
                    end: endDate,
                    offer: 0,
                    workers: 0
                },
            ]);
            res.json({ msg: "ok" });
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
        this.getJob = (req, res) => {
            let _id = req.params.id;
            job_1.default.findOne({ _id })
                .then((job) => {
                res.json(job);
            })
                .catch((err) => {
                console.error("Failed to retrieve job", err);
                res.status(500).json({ error: "Failed to retrieve job" });
            });
        };
        this.payJob = (req, res) => {
            let _id = req.body._id;
            console.log(_id);
            job_1.default.updateOne({ _id: _id }, { $set: { jobStatus: "finished" } }, { new: true }, (err, updatedJob) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(updatedJob);
                    res.json({ msg: "ok" });
                }
            });
        };
        this.makeAnOffer = (req, res) => {
            let _id = req.body._id;
            let offer = req.body.offer;
            console.log(_id);
            job_1.default.updateOne({ _id: _id }, { $set: { offer: offer } }, { new: true }, (err, updatedJob) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(updatedJob);
                    res.json({ msg: "ok" });
                }
            });
        };
        this.changeJobStatus = (req, res) => {
            let _id = req.body._id;
            let status = req.body.status;
            console.log(_id);
            job_1.default.updateOne({ _id: _id }, { $set: { jobStatus: status } }, { new: true }, (err, updatedJob) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(updatedJob);
                    res.json({ msg: "ok" });
                }
            });
        };
        this.changeObjectsColor = (req, res) => {
            let _id = req.body.objectID;
            let index = req.body.index;
            let color = req.body.color;
            console.log(_id);
            object_1.default.updateOne({ _id: _id }, { $set: { [`rooms.${index}.color`]: color } }, { new: true }, (err, updatedObject) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(updatedObject);
                    res.json({ msg: "ok" });
                }
            });
        };
        this.addJobWorkers = (req, res) => {
            let _id = req.body._id;
            let workers = req.body.workers;
            console.log(_id);
            job_1.default.updateOne({ _id: _id }, { $set: { workers: workers } }, { new: true }, (err, updatedJob) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(updatedJob);
                    res.json({ msg: "ok" });
                }
            });
        };
    }
}
exports.ObjectController = ObjectController;
//# sourceMappingURL=object.controller.js.map