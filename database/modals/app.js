import { Schema, model } from "mongoose";

const appSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  theme: {
    type: String,
    default: "dark"
  }
});

const App = model("App", appSchema);

export default App;
