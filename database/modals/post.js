import { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  }
});

const Post = model("Post", postSchema);

export default Post;
