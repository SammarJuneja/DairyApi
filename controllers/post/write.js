import User from "../../database/modals/user.js";
import Post from "../../database/modals/post.js";

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

        res.status(200).json({ message: "Post was created successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
