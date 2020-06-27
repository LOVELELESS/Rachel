import dotenv from "dotenv";
dotenv.config();
import { app, server } from "./server";
import mongoose from "mongoose";
import * as admin from "firebase-admin";
import authRoutes from "./routes/authRoutes";
import workspaceRoutes from "./routes/workspaceRoutes";

const PORT = process.env.PORT || 3000;

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

mongoose
  .connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/workspaces", workspaceRoutes);
app.get("/test", (req, res) => {
  const message = {
    data: {
      type: "warning",
      content: "A new weather warning has been created!",
    },
    topic: "test",
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      res.json({
        msg: "Successfully sent message",
      });
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      res.json({
        msg: "Error sending message",
      });
    });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
