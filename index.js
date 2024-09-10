import express from "express";
import { config } from "dotenv";
config();

const app = express();
const PORT = process.env.TOKEN || 4000;

app.get("/", (req, res) => {
    res.status(200).send("This is Dairy api");
})

app.listen(PORT, () => {
    console.log("App running on http://localhost:4000")
});
