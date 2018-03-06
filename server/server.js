const path=require("path");
const http=require("http");
const publicPath = path.join(__dirname, "../public");

const express = require("express");
//const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const {generateMessage, generateLocationMessage} = require("./utils/message.js");
const {isRealString} = require("./utils/validation.js");
const {Users} = require("./utils/users.js");

const app = express();
//app.use(bodyParser.json());
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


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

//io.emit -> to all connected
//io.to(room).emit -> to all in the room
//socket.broadcast.emit -> to all but sending user
//socket.broadcast.to(room).emit() -> to all but sending user in the Room
//socket.emit - to a connected user

app.use(express.static(publicPath)); //options

//register event listener for io
io.on("connection", (socket)=>{
  console.log("New user connected");


  socket.on("join", (params, callback)=>{
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback("Name and Room are required!");
    }

    socket.join(params.room); //socket.leave(params.room)
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit("updateUserList", users.getUserList(params.room));
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
    socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} joined the chat`));

    callback();

  });

  socket.on("disconnect", (reason)=>{
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList());
      io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left`));
    }
  });



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
