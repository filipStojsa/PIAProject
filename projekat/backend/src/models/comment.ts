import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Comment = new Schema({
    user: {
        type: String
    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    }
})

export default mongoose.model('CommentModel', Comment, 'comment')