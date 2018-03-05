var moment = require("moment");
//var date = new Date();
var date = moment(1234567890);
console.log(date.format("MMM Do, YYYY"));
console.log(date.format("h:mm a"));
