import express from "express";
import { config } from "./config.js";
import { connectDB } from "./database/index.js";
import { router as postRoutes } from "./routes/post/index.js";
import { router as userRoutes } from "./routes/user/index.js";
connectDB();

const app = express();
const PORT = config.PORT || 4000;

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
    res.status(200).send("This is Dairy api");
})

app.listen(PORT, () => {
    console.log("App running on http://localhost:4000")
});
