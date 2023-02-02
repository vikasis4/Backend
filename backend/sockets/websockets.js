const { createServer } = require("http");
const { Server } = require("socket.io");


const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(`<html><body><h1>This is HTML</h1></body></html>`)
};

const httpServer = createServer(requestListener);

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001", "http://192.168.1.36:3000"],
        methods: ["GET", "POST"]
    }
});
// const io = require("socket.io")(httpServer, {
//     cors: {
//         origin: ['https://rankboost.live', 'https://admin.rankboost.live']
//     }
// });
//////////////////////////////////// SERVER SETUP //////////////////////////////
const asp = io.of("/admin");
const nsp = io.of("/normal");
const vsp = io.of("/videocall");
var count = 0;
var livearray = [];

///////////////// ADMIN CONNECTION ////////////////////////////////////
asp.on("connection", (socket) => {
    socket.on('update-me', () => {
        asp.emit("live-listen", {count, livearray});
    })
})
///////////////// USER CONNECTION ////////////////////////////////////
nsp.on("connection", (socket) => {
    socket.on('update-cont', (data) => {
        count = count + 1;
        if (data) {
            livearray.push({email: data.email, id:data.id});
        }
        asp.emit("live-listen", {count, livearray});
    })
    socket.on('update-cont-new', (data) => {
        if (data.email === 'null') {
            
        }else{
            const index = livearray.findIndex((element) => element.id === data.id);
            livearray.splice(index, 1);
            livearray.push({email: data.email, id:data.id});;
            console.log(livearray);
            asp.emit("live-listen", {count, livearray});
        }
    })
    socket.on("disconnect", () => {
        const index = livearray.findIndex((element) => element.id === socket.id);
        if (index > -1) {
            count = count - 1;
            livearray.splice(index, 1);
        }
        asp.emit("live-listen", {count, livearray});
    })
})
////////////////////////// VIDEO CALL CONNECTION + SIGNALING SERVER ////////////////

// const socketToPeer = new Map();

// vsp.on("connection", (socket) => {

//     socket.on('join-room', (data) => {

//         const {roomId, userId} = data;
//         socketToPeer.set(socket.id, userId)
//         socket.join(roomId);
//         socket.broadcast.to(roomId).emit('user-connected', {userId});
//         socket.emit('joined-room', {roomId, userId});
//     })

//     socket.on('disconnect', ()=>{
//         var peerId = socketToPeer.get(socket.id)
//         socket.emit('user-disconnected', {peerId})
//     })
// })


/////////////////////// 8080 port listening ////////////////////////
httpServer.listen(8080, function () {
    console.log('Socket server running on port 8080');
});
