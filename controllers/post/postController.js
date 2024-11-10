import Post from "../../database/modals/post.js";

exports.read = (req, res) => {
    try {
        const { postId } = req.body;

        if (!postId) {
            return res.status(400).json({ "error": "Post id was not provided" });
        }

        const post = await Post.findOne({
            _id: postId
        });

        if (!post) {
            return res.status(404).json({ "error": "Post was not found" });
        }

        res.status(200).json({ post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "Internal server error" });
    }
}
