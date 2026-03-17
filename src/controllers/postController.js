import Post from "../models/postModel.js";

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.create({ title, content, author: req.user.id });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all posts
export const getPosts = async (req, res) => {
    try {  
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const posts = await Post.find().populate("author", "firstName lastName").sort({ createdAt: -1 }).skip(skip).limit(limit);

        const totalPosts = await Post.countDocuments();

        res.json({
            posts,
            page,
            pages: Math.ceil(totalPosts / limit)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

// Get a single post
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "firstName lastName");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a post - only the author can update
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not the author of this post" });
        }
        const { title, content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a post - only the author can delete
export const deletePost = async (req, res) => {
    try {  
        const post = await Post.findById(req.params.id);   
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not the author of this post" });
        }
        await post.remove();
        res.json({ message: "Post removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
