import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import eventRoutes from "./routes/eventRoutes";
import faqRoutes from "./routes/faqRoutes";
import testimonialRoutes from "./routes/testimonialRoutes";
import achievementRoutes from "./routes/achievementRoutes";
import requestLogger from "./middleware/requestLogger";
import errorHandler from "./middleware/errorHandler";
import config from "./config/env";

const app = express();

app.use(requestLogger);

app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload({ 
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
}));

app.use("/events", eventRoutes);
app.use("/faqs", faqRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/achievements", achievementRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Content Service is healthy" });
});

app.use(errorHandler);

export default app;