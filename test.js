var config = require("config");
const {  Client } = require('pg')

var con =  new Client({
    user:config.get("postgressql.username"),
    host: config.get("postgressql.host"),
    database: config.get("postgressql.database"),
    password:config.get("postgressql.password"),
    port: 5432,
  })

  con.connect();
  con.query('SELECT * from user', (err, res) => {
    console.log(err, res)
    con.end()
  })