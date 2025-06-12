import dotenv from 'dotenv';
dotenv.config();

export default {
  morganFormat: ':method :url :status :response-time ms',
  clientUrl: process.env.CLIENT_URL as string,
  serverUrl: process.env.SERVER_URL as string,
} as const;
