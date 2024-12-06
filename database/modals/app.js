import { Schema, model } from "mongoose";

const appSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  theme: {
    type: String,
    default: "Dark"
  }
});

const App = model("App", appSchema);

export default App;
