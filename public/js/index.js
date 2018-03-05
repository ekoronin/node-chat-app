var socket = io();
var locationButton;


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


socket.on("newLocationMessage", function(message){
  var li = $("<li></li>");
  var a = $("<a target=\"_blank\">My current location</a>");

  li.text(`${message.from}:`);
  a.attr("href", message.url);
  li.append(a);
  $("#messages").append(li);
});

//wrap jquery
$( document ).ready(function() {
  locationButton = $("#send-location");
  locationButton.on("click", function(){
      if (!navigator.geolocation) {
        return alert("Your browser does not support geolocation.");
      }

      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit("createLocationMessage", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, function(error){
        alert("Unable to fetch the location");
      });
  });

  $("#message-form").on("submit", function(e){
    e.preventDefault();

    socket.emit("createMessage", {
      from: "User",
      text: $("[name=message]").val()
    }, function(){

    });
  });
});
