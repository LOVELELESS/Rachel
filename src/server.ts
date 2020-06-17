import express from "express";
import socketio from "socket.io";
import http from "http";

const app = express();
app.use(express.json());

const server = new http.Server(app);

const io = socketio(server);

export { app, server, io };
