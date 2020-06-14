import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = process.env.PORT || 3000;
import authRoutes from "./routes/authRoutes";

mongoose
  .connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
