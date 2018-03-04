var socket = io();
socket.on("connect", function (){
  console.log("Connected to server");

});

socket.on("disconnect", function (){
  console.log("Disonnected from server");
});

socket.on("newMessage", function(message){
  console.log("New message: ", message);
  var li = $("<li></li>");
  li.text(`${message.from} says: ${message.text}`);
  $("#messages").append(li);
});


//wrap jquery
$( document ).ready(function() {
  $("#message-form").on("submit", function(e){
    e.preventDefault();

    socket.emit("createMessage", {
      from: "User",
      text: $("[name=message]").val()
    }, function(){

    });
  });
});
