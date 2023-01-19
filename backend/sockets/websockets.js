const { createServer } = require("http");
const { Server } = require("socket.io");


const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(`<html><body><h1>This is HTML</h1></body></html>`)
};

const httpServer = createServer(requestListener);

// const io = new Server(httpServer, {
//     cors: {
//         origin: ["http://localhost:3000", "http://localhost:3001", "http://192.168.1.36:3000"],
//         methods: ["GET", "POST"]
//     }
// });
const io = require("socket.io")(httpServer, {
    cors: {
        origin: ['https://rankboost.live', 'https://admin.rankboost.live']
    }
});
//////////////////////////////////// SERVER SETUP //////////////////////////////
const asp = io.of("/admin");
const nsp = io.of("/normal");
const vsp = io.of("/videocall");
var count = 0;
var livearray = [];

///////////////// ADMIN CONNECTION ////////////////////////////////////
asp.on("connection", (socket) => {
    socket.on('update-me', () => {
        asp.emit("live-listen", count);
    })
})
///////////////// USER CONNECTION ////////////////////////////////////
nsp.on("connection", (socket) => {

    socket.on('update-cont', (id) => {
        count = count + 1;
        if (id) {
            livearray.push(id);
        }
        asp.emit("live-listen", count);
    })
    socket.on("disconnect", () => {
        const index = livearray.findIndex((element) => element === socket.id);
        if (index > -1) {
            count = count - 1;
            livearray.splice(index, 1);
        }
        asp.emit("live-listen", count);
    })
})
////////////////////////// VIDEO CALL CONNECTION + SIGNALING SERVER ////////////////

const emailToSocket = new Map();
const socketToEmail = new Map();

vsp.on("connection", (socket) => {

    socket.on('join-room', (data) => {
        const {roomId, emailId} = data;
        console.log(emailId+' User Joined');
        emailToSocket.set(emailId, socket.id);
        socketToEmail.set(socket.id, emailId);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('New-User-Joined', {emailId});
        socket.emit('joined-room', {roomId, emailId});
    })

    socket.on('call-user', (data) => {
        const { offer, emailId } = data;
        const roomId = emailToSocket.get(emailId);
        const fromEmail = socketToEmail.get(socket.id);
        socket.to(roomId).emit('incoming-call', {from: fromEmail, offer})
    })

    socket.on('call-accepted', (data) => {
        const {ans, from} = data;
        const socketId = emailToSocket.get(from);
        socket.to(socketId).emit('call-accepted', {ans})
    })
})


/////////////////////// 8080 port listening ////////////////////////
httpServer.listen(8080, function () {
    console.log('Socket server running on port 8080');
});
