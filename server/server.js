const path=require("path");
const http=require("http");
const publicPath = path.join(__dirname, "../public");

const express = require("express");
//const bodyParser = require("body-parser");
const socketIO = require("socket.io");

const app = express();
//app.use(bodyParser.json());
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static(publicPath)); //options

//register event listener for io
io.on("connection", (socket)=>{
  console.log("New user connected");

  socket.on("disconnect", (reason)=>{
    console.log(`User disconnected with ${reason}`);
  });


  socket.on("createMessage", (message)=>{
    //console.log("Create message", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });// to everybody connected
  });
});


server.listen(port, ()=>{
  console.log("Server started on port "+port);
});
