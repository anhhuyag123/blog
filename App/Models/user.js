var promist = require("q");
var db = require("../Common/database");
var conn = db.getConnection()
function addUser(user) {
    if (user) {
        var data = [];
        data.push(user.email,user.first_name,user.last_name,new Date(),new Date(),user.tel,user.password)
        var defer = promist.defer();
        var query = conn.query('INSERT INTO "user" (email, first_name, last_name, create_at, update_at, tel, password) VALUES ($1, $2, $3, $4, $5, $6, $7)', data, function (error, results, fields) {
            if (error) {
                console.log(error)
                defer.reject(error);
            }
            else {
            
                defer.resolve(results.rows);
            }
            // Neat!
        });
        return defer.promise;
   }
       return false;
}
function getUserByEmail(email) {
    if (email) {
        var defer = promist.defer();
        var query = conn.query('SELECT * FROM "user"  where email  = $1',[email],function (err,result){
            if (err) {
                console.log(err)
                defer.reject(err);
            }
            else {      
                defer.resolve(result.rows);
            }
            // Neat!
        });
        return defer.promise;
   }
       return false;
}
function getAllUser() {
        var defer = promist.defer();
        var query = conn.query('SELECT * FROM "user" ',function (err,users){
            if (err) {
                console.log("loi o day")
                console.log(err)
                defer.reject(err);
            }
            else {      
                defer.resolve(users.rows);
            }
            // Neat!
        });
        return defer.promise;
}
module.exports = {
    addUser: addUser,
    getUserByEmail:getUserByEmail,
    getAllUser:getAllUser
}