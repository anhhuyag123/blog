var config = require("config");
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: config.get("mysql.host"),
    port: config.get("mysql.port"),
    database: config.get("mysql.database"),
    user:"root"
    
});

connection.connect();

connection.query('SELECT  * from user AS solution', function (error, results, fields) {
    if (error) {
        console.log("loi rui", error)
    }
    console.log('The solution is: ', results);
});

connection.end();