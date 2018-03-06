var socket = io();
var locationButton;

function scrollToBottom() {
  //selectors
  var messages = $("#messages");
  var newMessage = messages.children("li:last-child");
  //heights
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");

  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight); //scroll down for the new message
  }
}

socket.on("connect", function (){
  var params = $.deparam(window.location.search);
  socket.emit("join", params, function(error) {
    if (error) {
      alert(error);
      window.location.href = "/";
    }else {
      console.log("No error");
    }
  });


});

socket.on("disconnect", function (){
  console.log("Disonnected from server");
});

socket.on("updateUserList", function(users){
  var ol = $("<ol></ol>");
  users.forEach(function(u){
    ol.append($("<li></li>").text(u));
  });
  $("#users").html(ol);
});

socket.on("newMessage", function(message){
  var formattedTime = moment(message.createdAt).format("h:mm: a");
  // var li = $("<li></li>");
  // li.text(`${message.from} at ${formattedTime}: ${message.text}`);
  // $("#messages").append(li);

  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $("#messages").append(html);
  scrollToBottom();

});


socket.on("newLocationMessage", function(message){
var formattedTime = moment(message.createdAt).format("h:mm: a");
  // var li = $("<li></li>");
  // var a = $("<a target=\"_blank\">My current location</a>");
  // li.text(`${message.from} at ${formattedTime}:`);
  // a.attr("href", message.url);
  // li.append(a);
  // $("#messages").append(li);

  var template = $("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime  });
    $("#messages").append(html);
    scrollToBottom();
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
