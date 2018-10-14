var promist = require("q");
var db = require("../Common/database");
var conn = db.getConnection()
function addUser(user) {
    if (user) {
        var defer = promist.defer();
        var query = conn.query('INSERT INTO user SET ?', user, function (error, results, fields) {
            if (error) {
                console.log(error)
                defer.reject(error);
            }
            else {
            
                defer.resolve(results);
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
        var query = conn.query('SELECT * FROM user  where ?', {email: email},function (err,result){
            if (err) {
                console.log(err)
                defer.reject(err);
            }
            else {      
                defer.resolve(result);
            }
            // Neat!
        });
        return defer.promise;
   }
       return false;
}
function getAllUser() {
        var defer = promist.defer();
        var query = conn.query('SELECT * FROM user ',function (err,users){
            if (err) {
                console.log(err)
                defer.reject(err);
            }
            else {      
                defer.resolve(users);
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