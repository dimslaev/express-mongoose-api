import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./db";
import { errorHandler } from "./middlewares";
import { api } from "./api";
import { MessageResponse } from "./interfaces";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

connectDB();

app.get<unknown, MessageResponse>("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

app.use("/api", api);

app.use(errorHandler);

export default app;
