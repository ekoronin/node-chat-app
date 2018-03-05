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

      locationButton.attr("disabled", "disabled").text("Sending location...");;

      navigator.geolocation.getCurrentPosition(function(position){

        socket.emit("createLocationMessage", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }, function (){
            locationButton.removeAttr("disabled").text("Send Location");
        });
      }, function(error){
        alert("Unable to fetch the location");
        locationButton.removeAttr("disabled").text("Send Location");
      });
  });

  $("#message-form").on("submit", function(e){
    e.preventDefault();
    var msgTextBox = $("[name=message]");
    socket.emit("createMessage", {
      from: "User",
      text: msgTextBox.val()
    }, function(){
        //clear input
        msgTextBox.val("");
    });
  });
});
