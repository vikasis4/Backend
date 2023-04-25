const { Server } = require("socket.io");

const io = new Server(5000, {
  cors: true,
});

/////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////

io.on("connection", (socket) => {

  console.log(`Socket Connected :- `, socket.id);

  io.to(socket.id).emit('get_id', socket.id);

  socket.on("student-offer", ({ to, offer }) => {
    io.to(to).emit("student-offer", { from: socket.id, offer });
  });

  socket.on("offer-accepted", ({ to, ans }) => {
    io.to(to).emit("offer-accepted", { from: socket.id, ans });
  });

  socket.on("ice-candidate", ({ to, candidate }) => {
    io.to(to).emit("ice-candidate", { candidate });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
