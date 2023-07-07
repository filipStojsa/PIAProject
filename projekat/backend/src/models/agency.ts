import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Agency = new Schema({
    agencyName: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    adress: {
        type: String
    },
    pib: {
        type: String
    },
    description: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    tel: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    },
    comments: {
        type: Array
    },
    status: {
        type: String
    },
    workers: {
        type: String
    },
})

export default mongoose.model('AgencyModel', Agency, 'agency')