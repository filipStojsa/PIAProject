import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Room = new Schema({
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    color: {
        type: String
    }
})

export default mongoose.model('RoomModel', Room, 'room')