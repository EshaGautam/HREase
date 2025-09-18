import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./src/config/database.js";
import dotenv from "dotenv";
import router from "./src/routes/userRoutes.js";

dotenv.config();

connectDB();

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1',router)

app.listen(process.env.PORT, () => {
  console.log("server started");
});
