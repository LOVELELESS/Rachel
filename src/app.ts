import dotenv from "dotenv";
dotenv.config();
import { app, server } from "./server";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import workspaceRoutes from "./routes/workspaceRoutes";

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/workspaces", workspaceRoutes);

server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
