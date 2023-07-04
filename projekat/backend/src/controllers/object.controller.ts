import express from 'express'
import ObjekatModel from '../models/object'
import AgencyModel from '../models/agency'
import JobModel from '../models/job'
import { Request, Response } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

export class ObjectController {
  get = (req: express.Request, res: express.Response) => {
    // throw new Error('Method not implemented.')
    console.log("get");
    res.json({ msg: "ok" });
  };

  addObject = (req: express.Request, res: express.Response) => {
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

    ObjekatModel.insertMany([
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

  getMyObjects = (req: express.Request, res: express.Response) => {
    let username = req.params.username;
    ObjekatModel.find({ user: username })
      .then((objects) => {
        res.json(objects);
      })
      .catch((err) => {
        console.error("Failed to retrieve objects", err);
        res.status(500).json({ error: "Failed to retrieve objects" });
      });
  };

  getMyJobs = (req: express.Request, res: express.Response) => {
    let username = req.params.username;
    JobModel.find({ username: username })
      .then((jobs) => {
        res.json(jobs);
      })
      .catch((err) => {
        console.error("Failed to retrieve jobs", err);
        res.status(500).json({ error: "Failed to retrieve jobs" });
      });
  };

  getAgencyJobs = (req: express.Request, res: express.Response) => {
    let agencyUsername = req.params.agencyUsername;
    JobModel.find({ agencyUsername: agencyUsername })
      .then((jobs) => {
        res.json(jobs);
      })
      .catch((err) => {
        console.error("Failed to retrieve jobs", err);
        res.status(500).json({ error: "Failed to retrieve jobs" });
      });
  };

  addJob = (req: express.Request, res: express.Response) => {
    let objectsId = req.body.selectedObject;
    let agencyUsername = req.body.selectedAgency;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let username = req.body.username;

    JobModel.insertMany([
      {
        username: username,
        agencyUsername: agencyUsername,
        jobStatus: "pending",
        object: objectsId,
        start: startDate,
        end: endDate,
        offer: 0
      },
    ]);

    res.json({ msg: "ok" });
  };

  getObject = (req: express.Request, res: express.Response) => {
    let _id = req.params.id;
    ObjekatModel.findOne({ _id })
      .then((objects) => {
        res.json(objects);
      })
      .catch((err) => {
        console.error("Failed to retrieve objects", err);
        res.status(500).json({ error: "Failed to retrieve objects" });
      });
  };

  getJob = (req: express.Request, res: express.Response) => {
    let _id = req.params.id;
    JobModel.findOne({ _id })
      .then((job) => {
        res.json(job);
      })
      .catch((err) => {
        console.error("Failed to retrieve job", err);
        res.status(500).json({ error: "Failed to retrieve job" });
      });
  };

  payJob = (req: express.Request, res: express.Response) => {
    let _id = req.body._id;
    console.log(_id)
    JobModel.updateOne(
      { _id : _id },
      { $set: { jobStatus: "finished" } },
      { new: true },
      (err, updatedJob) => {
        if (err) {
          console.error(err);
        } else {
          console.log(updatedJob);
          res.json({ msg: "ok" });
        }
      }
    );
  };

  makeAnOffer = (req: express.Request, res: express.Response) => {
    let _id = req.body._id;
    let offer = req.body.offer

    console.log(_id)
    JobModel.updateOne(
      { _id : _id },
      { $set: { offer: offer } },
      { new: true },
      (err, updatedJob) => {
        if (err) {
          console.error(err);
        } else {
          console.log(updatedJob);
          res.json({ msg: "ok" });
        }
      }
    );
  };

  changeJobStatus = (req: express.Request, res: express.Response) => {
    let _id = req.body._id;
    let status = req.body.status

    console.log(_id)
    JobModel.updateOne(
      { _id : _id },
      { $set: { jobStatus: status } },
      { new: true },
      (err, updatedJob) => {
        if (err) {
          console.error(err);
        } else {
          console.log(updatedJob);
          res.json({ msg: "ok" });
        }
      }
    );
  };
}