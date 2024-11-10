import { Router } from "express";
import {  } from "../../controllers/userController.js";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ "message": "User routing" });
});

export { router };
