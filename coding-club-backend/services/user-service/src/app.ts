import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import teamRoutes from "./routes/teamRoutes";
import generalRoutes from "./routes/generalRoutes";
import requestLogger from "./middleware/requestLogger";
import errorHandler from "./middleware/errorHandler";
import config from "./config/env";

const app = express();

app.use(requestLogger);

app.use(
  cors({
    origin: config.CLIENT_URL, // Allow requests from your frontend
    credentials: true, // Allow cookies and authentication headers
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/user", userRoutes);
app.use("/team", teamRoutes);
app.use("/general", generalRoutes);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Healthy" });
});

app.use(errorHandler);

export default app;
