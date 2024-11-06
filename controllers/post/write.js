import User from "../../database/modals/user.js";
import Post from "../../database/modals/post.js";

export const write = async (req, res) => {
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
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "Internal server error" });
    }
}
