import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5003,
  MONGO_URI: process.env.MONGO_URI!,
  CLIENT_URL: process.env.CLIENT_URL!,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
};