const path=require("path");
const publicPath = path.join(__dirname, "../public");

const express = require("express");
//const bodyParser = require("body-parser");

const app = express();
//app.use(bodyParser.json());

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


app.listen(port, ()=>{
  console.log("Server started on port "+port);
});
