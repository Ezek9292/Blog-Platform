import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

// Create a new comment
export const createComment = async (req, res) => {
    try {
        const { content, postId } = req.body;  
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const comment = await Comment.create({ content, author: req.user.id, post: postId });
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
};

// Get comments for a post
export const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).populate("author", "firstName lastName").sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a comment - only the author can update
export const updateComment = async (req, res) => {
    try {   
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }   
        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not the author of this comment" });
        }   
        const { content } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { content }, { new: true });
        res.json(updatedComment);
    }   
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a comment - only the author can delete
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not the author of this comment" });
        }
        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

