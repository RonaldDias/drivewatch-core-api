import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import { globalRateLimiter } from "../../infra/security/rate-limiter";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "512kb" }));
app.use(express.urlencoded({ limit: "512kb", extended: true }));
app.use(hpp());
app.use(globalRateLimiter);

export { app };
