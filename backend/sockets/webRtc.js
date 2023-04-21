const { Server } = require("socket.io");

const io = new Server(5000, {
  cors: true,
}); 


io.on("connection", (socket) => {

  console.log(`Socket Connected :- `, socket.id);
   
  io.to(socket.id).emit('get_id', socket.id);
  
  socket.on("student_socket_id", (data) => {
    const { from, to } = data;
    io.to(to).emit("student_socket_id", from);
  });

  socket.on("confirmation", (data) => {
    const { from, to, status } = data;
    io.to(to).emit("confirmation", status);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call-final-favor", ({ to }) => {
    io.to(to).emit("call-final-favor", 'wow');
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
