
export const toggleLike = async (req, res) => {
    try {
        const postId = await Post.findById(req.params.postId);
        if (!postId) {
            return res.status(404).json({ message: "Post not found" });
        }   
        const userId = req.user._id.toString();
        const alreadyLiked = postId.likes.includes(userId);
        if (alreadyLiked) {
            postId.likes = postId.likes.filter(id => id.toString() !== userId);
            await postId.save();
            return res.json({ message: "Post unliked" });
        }
        postId.likes.push(userId);
        await postId.save();
        res.json({ message: "Post liked" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
