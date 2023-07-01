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
        type: Object
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    }
})

export default mongoose.model('JobModel', Job, 'job')