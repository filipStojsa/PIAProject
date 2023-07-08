import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    offer: {
        type: Number
    },
    workers: {
        type: Number
    }
})

export default mongoose.model('JobModel', Job, 'job')