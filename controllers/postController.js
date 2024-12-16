import Post from "../../database/modals/post.js";
import User from "../../database/modals/user.js";

exports.read = async (req, res) => {
    try {
        const { postId } = req.body;

        if (!postId) {
            return res.status(400).json({ message: "Post id was not provided" });
        }

        const post = await Post.findOne({
            _id: postId
        });

        if (!post) {
            return res.status(404).json({ message: "Post was not found" });
        }

        res.status(200).json({ post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.write = async (req, res) => {
    try {
        const { body, title, user } = req.body;

        if (!body || !title) {
            return res.status(400).json({ message: "Title or description was empty" });
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
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.edit = async (req, res) => {
    try {
        const { body, title, postId } = req.body;

        if (!body || !title) {
            return res.status(400).json({ message: "Title or description was empty" });
        }

        if (!postId) {
            return res.status(404).json({ message: "Post doesn't exist" });
        }

        const post = await Post.findOne({
            _id: postId
        });

        if (!post) {
            return res.status(404).json({ message: "Post was not found" });
        }

        let TITLE = title || post.title;
        let BODY = body || post.body;

        await Post.updateOne({
            _id: postId
        }, {
            $set: {
                title: TITLE,
                body: BODY
            }
        });

        res.status(200).json({
            message: "You successfully edited a post"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
