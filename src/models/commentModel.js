import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

    const Comment = mongoose.model("Comment", userSchema);

    export default Comment;