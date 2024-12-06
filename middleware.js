import jwt from "jsonwebtoken";
import { config } from "./config.js";

const secretKey = config.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    req.user = decoded;
    next();
  });
};

export default authenticateJWT;

