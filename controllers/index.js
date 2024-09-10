import User from "../database/modals/user.js";
import Post from "../database/modals/post.js";

export const write = async (req, res) => {
    try {
        const { description, title } = req.body;
        const userId = "";
        const date = "";
        const time = "";

        if (!description && !title) {
            return res.status(400).json({ "error": "Title or description was empty" });
        }

        const newPost = new Post({
            title: title,
            description: description,
            date: date,
            time: time,
            userId: userId
        });
        newPost.save();
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "Internal server error" });
    }
}