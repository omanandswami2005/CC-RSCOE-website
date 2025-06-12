import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL!,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL!,
  CLIENT_URL: process.env.CLIENT_URL!,
};
