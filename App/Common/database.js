var config = require("config");
var mysql = require('mysql');

var con = mysql.createConnection({
    host: config.get("mysql.host"),
    port: config.get("mysql.port"),
    database: config.get("mysql.database"),
    user:config.get("mysql.username")
});

con.connect();
function getConnection() {
    if (!con) {
        con.connect();
    }
    return con;
}
module.exports = {
    getConnection: getConnection
}