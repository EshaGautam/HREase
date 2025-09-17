import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();

connectDB();

let app = express();
app.use(bodyParser);

app.listen(3000, () => {
  console.log("server started");
});
