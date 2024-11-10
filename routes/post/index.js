import { Router } from "express";
import { read, write } from "../../controllers/postController.js";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ "message": "Post routing" });
});

router.get("/get", read);

export { router };
