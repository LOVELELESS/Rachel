import express from "express";

const receptionistRoutes = express.Router();

receptionistRoutes.post("/verify_qrcode", (req, res) => {});

// PROBABLY NEED TO USE SOCKETIO TO ENABLE REALTIME COMMS FOR FALLBACK_EMPLOYEE && RECEPTIONIST

export default receptionistRoutes;
