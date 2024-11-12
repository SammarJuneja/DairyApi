import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  post: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true
    }],
    default: []
  },
  app: {
    type: Schema.Types.ObjectId,
    ref: "App",
    required: true
  }
});

const User = model("User", userSchema);

export default User;
