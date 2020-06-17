import express from "express";
import { io } from "../server";

const receptionistRoutes = express.Router();

io.on("connection", (socket: SocketIO.Socket) => {
  console.log("socket connected");
  const { workspaceName }: { workspaceName: string } = socket.handshake.query;
  console.log(workspaceName);
  socket.join(workspaceName);

  socket.on("test", (data: any) => {
    console.log(data);
  });
});

receptionistRoutes.get("/test", (req, res) => {
  const { workspaceName }: { workspaceName: string } = req.body;
  io.to(workspaceName).emit("news", { hello: "world" });
  res.json({ msg: "helo" });
});

receptionistRoutes.post("/verify_qrcode", (req, res) => {});

// PROBABLY NEED TO USE SOCKETIO TO ENABLE REALTIME COMMS FOR FALLBACK_EMPLOYEE && RECEPTIONIST

export default receptionistRoutes;
