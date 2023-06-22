import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    }
})

export default mongoose.model('UserModel', User, 'users')