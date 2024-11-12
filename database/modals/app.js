import { Schema, model } from "mongoose";

const appSchema = new Schema({
  theme: {
    type: String,
    default: "dark"
  }
});

const App = model("App", appSchema);

export default App;
