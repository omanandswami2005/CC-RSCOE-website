import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5002,
  MONGO_URI: process.env.DB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN!,
  CLIENT_URL: process.env.CLIENT_URL!,
  AUTH_URL: process.env.AUTH_URL!,
};
