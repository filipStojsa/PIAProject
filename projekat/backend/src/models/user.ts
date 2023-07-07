import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String
    },
    surname: {
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
    status: {
        type: String
    }
})

export default mongoose.model('UserModel', User, 'users')