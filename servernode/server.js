import { createServer } from "node:http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "https://tumenuonline.com",
    methods: "GET,POST,OPTIONS",
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
    credentials: true
}));
const httpServer = createServer(app);
const ioServer = new Server(httpServer, {
    cors: {
        origin: "https://tumenuonline.com", // Permite solicitudes desde este origen
        methods: ["GET", "POST"],
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
        credentials: true
    }
});

app.get("/", (req, res) => {
    return res.send("Node http server running bbzote");
});
ioServer.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('create-new-order', (message) => {
        ioServer.emit('get-new-order', message);
    });

    socket.on('new-status', (status) => {
        ioServer.emit('update-status', status);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});
httpServer.listen(9000, () => {
    console.log("Claro que yes bb, running in port 9000");
});
