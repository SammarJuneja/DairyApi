import mongoose from "mongoose";
import { config } from "../../config.js");

mongoose.connect(config.MONGO_URI);
