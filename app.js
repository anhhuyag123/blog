var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var session = require('express-session');
var favicon = require('serve-favicon')
var app = express();
var socketio = require('socket.io');
//body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}))
app.set('trust proxy', 1);
app.use(session({
    secret:"huyha",
    resave:false,
    saveUninitialized:true,
    cookie: {secure:false}
}))
app.use(favicon(__dirname + '/Public/favicon.ico'));
app.set("views",__dirname +"/App/Views")
app.set("view engine","ejs")
// Static folders
app.use("/static",express.static(__dirname + "/Public"))

var controler = require(__dirname + "/App/Controllers")
app.use(controler);

var server = app.listen(process.env.PORT || 4000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
var io = socketio(server);
var socketcontrol = require("./App/Common/socketcontrol")(io);