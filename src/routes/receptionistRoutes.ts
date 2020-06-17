import express from "express";
import { io } from "../server";

const receptionistRoutes = express.Router();

io.on("connection", (socket: SocketIO.Socket) => {
  console.log("socket connected");
  const { workspaceName }: { workspaceName: string } = socket.handshake.query;
  socket.join(workspaceName);
  socket.on("manual_form_reply", (data) => {
    console.log(data);
    io.to(workspaceName).emit("manual_form_get_reply", data);
  });
  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

receptionistRoutes.get("/test", (req, res) => {
  const { workspaceName }: { workspaceName: string } = req.body;
  io.to(workspaceName).emit("manual_form_submission", { hello: "world" });
  res.json({
    msg: "Successfully emitted manual_form_submission to fallback employee",
  });
});

receptionistRoutes.post("/verify_qrcode", (req, res) => {});

// PROBABLY NEED TO USE SOCKETIO TO ENABLE REALTIME COMMS FOR FALLBACK_EMPLOYEE && RECEPTIONIST

export default receptionistRoutes;
