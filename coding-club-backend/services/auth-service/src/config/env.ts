import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5001,
  SERVER_URL: process.env.SERVER_URL!,
  CLIENT_URL: process.env.CLIENT_URL!,
};
