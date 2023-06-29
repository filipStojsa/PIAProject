import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Objekat = new Schema({
    type: {
        type: String
    },
    address: {
        type: String
    },
    num: {
        type: Number
    },
    area: {
        type: Number
    },
    user: {
        type: String
    },
    status: {
        type: String
    },
    rooms: {
        type: Array
    }
})

export default mongoose.model('ObjekatModel', Objekat, 'objekat')