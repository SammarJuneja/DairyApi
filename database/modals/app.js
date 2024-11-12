import { Schema, model } from "mongoose";

const app = new Schema({
  theme: {
    type: String,
    default: "dark"
  }
});
