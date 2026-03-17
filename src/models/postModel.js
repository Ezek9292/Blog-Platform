import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
}, { timestamps: true });

const Post = mongoose.model("Post", userSchema);

export default Post;