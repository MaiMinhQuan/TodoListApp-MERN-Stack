import express from "express";
import mongoose from "mongoose";
import apiRoute, { apiProtected } from "./routes/api.js";
import { DB_CONNECT, PORT } from "./utils/constants.js";
import AuthMiddleware from "./middlewares/authMiddleware.js";
import cors from "cors";

const app = express();

mongoose.connect(DB_CONNECT, (e) =>
  console.log("Error connecting to DB: " + e)
);

app.use(cors());
app.use(express.json());
app.use("/api/", apiRoute);
app.use("/api/", AuthMiddleware, apiProtected);

app.listen(PORT, () => console.log("server is running on port: " + PORT));
