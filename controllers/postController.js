import Post from "../../database/modals/post.js";
import User from "../../database/modals/user.js";

exports.read = async (req, res) => {
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

exports.write = async (req, res) => {
    try {
        const { body, title, user } = req.body;

        if (!body || !title) {
            return res.status(400).json({ "error": "Title or description was empty" });
        }

        const newPost = new Post({
            title: title,
            body: body,
            createdAt: Date.now(),
            user: user
        });

        newPost.save();

        await User.updateOne({
            _id: user._id
        }, {
            $push: {
                post: newPost
            }
        });

        res.status(200).json({
            message: "You successfully wrote a post"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "Internal server error" });
    }
}
