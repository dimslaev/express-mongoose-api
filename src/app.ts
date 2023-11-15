import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import { api } from "./api";
import { MessageResponse } from "./interfaces";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<unknown, MessageResponse>("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

app.use("/api", api);

export default app;
