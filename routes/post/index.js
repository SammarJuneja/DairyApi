import { Router } from "express";
import { read, write } from "../../controllers/postController.js";
const router = Router();

router.get("/get", read);

export { router };
