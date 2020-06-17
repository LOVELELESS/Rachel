import express from "express";
import { io } from "../server";

const receptionistRoutes = express.Router();

io.on("connection", (socket: SocketIO.Socket) => {
  console.log("socket connected");
  socket.on("test", (data: any) => {
    console.log(data);
  });
});

receptionistRoutes.get("/test", (req, res) => {
  io.emit("news", { hello: "world" });
  res.json({ msg: "hello world" });
});

receptionistRoutes.post("/verify_qrcode", (req, res) => {});

// PROBABLY NEED TO USE SOCKETIO TO ENABLE REALTIME COMMS FOR FALLBACK_EMPLOYEE && RECEPTIONIST

export default receptionistRoutes;
