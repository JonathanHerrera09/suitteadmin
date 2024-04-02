import { createServer } from "node:http";
import { Server } from "socket.io";
import express from "express";

const app = express();

const httpServer = createServer(app);

const ioServer = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        /* origin: "http://18.118.226.208:3000", */
    }
});

app.get("/", (req, res) => {
    return res.send("Node http server running bbzote");
});

ioServer.on('connection', (socket) => {

    console.log(socket.id);

    socket.on('create-new-order', (message) => {
        /* console.log('message', message); */
        ioServer.emit('get-new-order', message);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

});

    

httpServer.listen(9000, () => {
    console.log("Claro que yes bb, running in port 9000");
});

