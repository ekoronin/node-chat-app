var socket = io();
socket.on("connect", function (){
  console.log("Connected to server");
  
  socket.emit("createMessage", {
    from:"Andrew",
    text: "Hey, this is Andrew"
  });
});

socket.on("disconnect", function (){
  console.log("Disonnected from server");
});

socket.on("newMessage", function(message){
  console.log("New message: ", message);
});
