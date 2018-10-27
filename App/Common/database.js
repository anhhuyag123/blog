var config = require("config");
const {  Client } = require('pg')

var con =  new Client({
    user:"dmqxigukrwztrp",
    host: "ec2-54-243-61-194.compute-1.amazonaws.com",
    database: "ddir6ml2vbbhpb",
    password:"b84bb967e824eb79fad0435c394fe58c5df4604038d4ce977574b0dcd737d777",
    port: 5432,
  })

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