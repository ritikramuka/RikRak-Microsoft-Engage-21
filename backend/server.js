const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

const PORT = 3001;

app.use(express.static(path.join(__dirname, "public")));

// Route
app.get("/ping", (req, res) => {
  res.send({ success: true }).status(200);
});

// Socket
const SocketBucket = {};

io.on("connection", (socket) => {
  console.log(`New User: ${socket.id} connected`);

  // disconnect
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log(`User ${socket.id} disconnected`);
  });

  // join room
  socket.on("joinRoom", ({ roomId, userName }) => {
    // join room with it's id
    socket.join(roomId);
    SocketBucket[socket.id] = { userName, video: true, audio: true };

    // add to user bucket
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        const users = [];
        clients.forEach((client) => {
          users.push({ userId: client, info: SocketBucket[client] });
        });
        socket.broadcast.to(roomId).emit("userJoin", users);
      } catch (e) {
        io.sockets.in(roomId).emit("errorUserExist", { err: true });
      }
    });
  });

  // call user
  socket.on("callUser", ({ userToCall, from, signal }) => {
    // get call
    io.to(userToCall).emit("recieveCall", {
      signal,
      from,
      info: SocketBucket[socket.id],
    });
  });

  // accept call
  socket.on("attendCall", ({ signal, to }) => {
    // call accepted
    io.to(to).emit("callAttended", {
      signal,
      answerId: socket.id,
    });
  });

  // toggle camera audio (off / on)
  socket.on("cameraAudioLever", ({ roomId, switchTarget }) => {
    // if video else opted audio
    if (switchTarget === "video") {
      SocketBucket[socket.id].video = !SocketBucket[socket.id].video;
    } else {
      SocketBucket[socket.id].audio = !SocketBucket[socket.id].audio;
    }

    socket.broadcast
      .to(roomId)
      .emit("toggleCamera", { userId: socket.id, switchTarget });
  });

  // check for user
  socket.on("hasUser", ({ roomId, userName }) => {
    const error = false;

    io.sockets.in(roomId).clients((err, clients) => {
      clients.forEach((client) => {
        if (SocketBucket[client] == userName) error = true;
      });

      // error if user exists
      socket.emit("errorHasUser", { error });
    });
  });

  // send message ('say hello!')
  socket.on("sendMessage", ({ roomId, msg, sender }) => {
    // recieve message
    io.sockets.in(roomId).emit("getMessage", { msg, sender });
  });

  // end call / leave room
  socket.on("leaveRoom", ({ roomId, leaver }) => {
    // delete from bucket
    delete SocketBucket[socket.id];
    socket.broadcast
      .to(roomId)
      .emit("userLeft", { userId: socket.id, userName: [socket.id] });
    io.sockets.sockets[socket.id].leave(roomId);
  });

  // Word Pad Event Listeners
  socket.on('getDocument', roomId => {
    const data = ''
    socket.join(roomId)
    socket.emit('loadDocument', data)

    socket.on('sendChanges', delta => {
      socket.broadcast.to(roomId).emit('receiveChanges', delta)
    })
  });

  socket.on('drawing', (data) => socket.to(data.roomId).broadcast.emit('drawing', data));
});

http.listen(PORT, () => {
  console.log(`connected, on http://localhost:${PORT}`);
});
