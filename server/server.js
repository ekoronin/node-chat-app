const path=require("path");
const http=require("http");
const publicPath = path.join(__dirname, "../public");

const express = require("express");
//const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const {generateMessage, generateLocationMessage} = require("./utils/message.js");

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

  socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
  socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined the chat"));


  socket.on("createMessage", (message, callback)=>{
    console.log("Create message", message);
    io.emit("newMessage", generateMessage( message.from,  message.text));// to everybody connected
    callback();
    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // }); //emit - //not to yourself


  });//createMessage

  socket.on("createLocationMessage", (coords, callback)=>{
    io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    callback();
  });

});//connection


server.listen(port, ()=>{
  console.log("Server started on port "+port);
});
