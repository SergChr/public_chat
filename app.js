const express = require('express');
const path = require('path');
const ejs = require("ejs");
const ejsl = require("ejs-locals");

const router = require('./routes/index');

const app = express();
//var http = require('http').Server(app);
//global.io = require('socket.io')(http);
//var socket = require("./socket");
// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(express.static(path.join(__dirname, 'public')));

app.use(router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running...");
});

module.exports = app;
