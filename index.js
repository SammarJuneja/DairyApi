import express from "express";
import { config } from "./config.js";
import { connectDB } from "./database/index.js";
import { router as routes } from "./routes/index.js";
connectDB();

const app = express();
const PORT = config.PORT || 4000;

app.use("/api/v1", routes);

app.get("/", (req, res) => {
    res.status(200).send("This is Dairy api");
})

app.listen(PORT, () => {
    console.log("App running on http://localhost:4000")
});
