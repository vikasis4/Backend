const express = require('express');
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

/////////////////////// CHAT //////////////////////////////////
const chat = io.of("/chat");

chat.on("connection", (socket) => {
  socket.on('join_room', ({ room }) => {
    socket.join(room)
  })
  socket.on('newMsg', async ({ message, room }) => {
    socket.broadcast.to(room).emit('newMsg', ({ message }))
  })

})
/////////////////////// CALL //////////////////////////////////
const call = io.of("/call");

call.on("connection", (socket) => {

  socket.emit("yourID", socket.id);

  socket.on("remoteId", ({ from, to }) => {
    call.to(to).emit("remoteId", from)
  });

  socket.on("iceCandidate", ({ to, candidate }) => {
    call.to(to).emit("iceCandidate", candidate)
  });

  socket.on("offer", ({ to, offer }) => {
    call.to(to).emit("offer", { from: socket.id, offer })
  });

  socket.on("answer", ({ to, answer }) => {
    call.to(to).emit("answer", answer)
  });

  socket.on("close", ({ to }) => {
    call.to(to).emit("close", { close: 'now' })
  });

});

server.listen(5000, () => {
  console.log('Socket Server running on PORT 5000');
});