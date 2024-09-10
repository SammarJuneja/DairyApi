import { config } from "dotenv";
config();

export const config = {
    PORT: process.env.PORT,
    MONGO: process.env.MONGO_URI
}
