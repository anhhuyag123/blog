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
    secret:config.get("secret_key"),
    resave:false,
    saveUninitialized:true,
    cookie: {secure:false}
}))
app.use(favicon(__dirname + '/Public/favicon.ico'));
app.set("views",__dirname +"/App/Views")
app.set("view engine","ejs")
// Static folders
app.use("/static",express.static(__dirname + "/Public"))

var controler = require(__dirname + "/app/Controllers")
app.use(controler);
var host = config.get("server.host")
var port = config.get("server.port")
var server = app.listen(port,host,function() {
    console.log("Server đang chạy trên cổng " ,port)
});
var io = socketio(server);
var socketcontrol = require("./App/Common/socketcontrol")(io);