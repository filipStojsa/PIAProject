import express from 'express'
import ObjekatModel from '../models/object'
import AgencyModel from '../models/agency'
import JobModel from '../models/job'
import { Request, Response } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

export class ObjectController {
  getAllJobs = (req: express.Request, res: express.Response) => {
    JobModel.find({}, (err, jobs) => {
      if (err) console.log(err);
      else {
        if (jobs) {
          res.json(jobs);
        }
      }
    });
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
        offer: 0,
        workers: 0
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
    console.log(_id);
    JobModel.updateOne(
      { _id: _id },
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
    let offer = req.body.offer;

    console.log(_id);
    JobModel.updateOne(
      { _id: _id },
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
    let status = req.body.status;

    console.log(_id);
    JobModel.updateOne(
      { _id: _id },
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

  changeObjectsColor = (req: express.Request, res: express.Response) => {
    let _id = req.body.objectID;
    let index = req.body.index;
    let color = req.body.color;

    console.log(_id);
    ObjekatModel.updateOne(
      { _id: _id },
      { $set: { [`rooms.${index}.color`]: color } },
      { new: true },
      (err, updatedObject) => {
        if (err) {
          console.error(err);
        } else {
          console.log(updatedObject);
          res.json({ msg: "ok" });
        }
      }
    );
  };

  addJobWorkers = (req: express.Request, res: express.Response) => {
    let _id = req.body._id;
    let workers = req.body.workers;

    console.log(_id);
    JobModel.updateOne(
      { _id: _id },
      { $set: { workers: workers } },
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
  }

  deleteObject = (req: express.Request, res: express.Response) => {
    let _id = req.body._id;
    console.log(_id)
    ObjekatModel.deleteOne({ '_id': _id }, (err, result) => {
        if (err) console.error(err);
    
        if (result.deletedCount === 0) {
          return res.status(404).json({ 'msg': 'notFound' });
        }
    
        res.json({ 'msg': 'ok' });
    })
  }

  changeObjectField = (req: express.Request, res: express.Response) => {
    let _id = req.body._id;
    let field = req.body.field;
    let value = req.body.value;
    ObjekatModel.findOne({'_id': _id}, (err, obj)=>{
      console.log(obj)
      if(err) console.log(err)
      else {
          if(obj) {
              ObjekatModel.updateOne(
                  { '_id': _id },
                  { $set : { [ field ] : value } },
                  (err, resp) => {
                      if(err) console.log(err)
                      else {
                          res.json({'msg': 'ok'})
                      }
                  }
              )
          }
          else {
              res.json({'msg': 'notFound'})
          }
      }
    })
  }
}