import { Schema, model } from "mongoose";

const userSchema = new Schema({
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
      ref: "User"
    },
    default: ""
  }
});

const User = model("User", userSchema);

export default User;