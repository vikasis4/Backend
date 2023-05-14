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

  console.log("CHAT :- ", socket.id);

  socket.on('join_room', ({ room }) => {
    socket.join(room)
    console.log("ROOM JOINED :- ", room);
  })
  socket.on('newMsg', async ({ message, room }) => {
    socket.broadcast.to(room).emit('newMsg', ({ message }))
  })

})
/////////////////////// CALL //////////////////////////////////
const call = io.of("/call");

call.on("connection", (socket) => {

  console.log("Call :- ", socket.id);

  socket.on('decline', ({id}) => {
    call.to(id).emit('decline');
  })
  socket.on('accept', ({ room }) => {
    console.log('accept');
  })
  socket.on('getId', () => {
    call.to(socket.id).emit('getId', socket.id);
  })

})

server.listen(5000, () => {
  console.log('Socket Server running on PORT 5000');
});