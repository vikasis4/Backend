const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST"]
    }
});
// const io = require("socket.io")(http, {
//     cors: {
//         origin: ['https://rankboost.live', 'https://admin.rankboost.live']
//     }
// });
//////////////////////////////////// SERVER SETUP //////////////////////////////
const asp = io.of("/admin");
const nsp = io.of("/normal");
var count = 0;
var livearray = [];

///////////////// ADMIN CONNECTION ////////////////////////////////////
asp.on("connection", (socket) => {
    // socket.on("Texts", (data) => {
    //     nsp.to(data.connection).emit("data", data);
    // })
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
    // socket.on('Texts', (data) => {
    //     asp.emit('daata', data);
    // })
    // socket.on("join-room", (room) => {
    //     socket.join(room)
    // })
})
/////////////////////// 8080 port listening ////////////////////////
httpServer.listen(8080, function () {
    console.log('Socket server running on port 8080');
});
