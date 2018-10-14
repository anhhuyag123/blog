var promist = require("q");
var db = require("../Common/database");
var conn = db.getConnection()
function getAllPosts() {
        var defer = promist.defer();
        var query = conn.query('Select * from posts', function (error, posts) {
            if (error) {
                console.log(error)
                defer.reject(error);
            }
            else {          
                defer.resolve(posts);
            }
            // Neat!
        });
        return defer.promise;
}
function addPost(data) {
    if (data) {
        var defer = promist.defer();
        var query = conn.query('INSERT INTO posts SET ?', data, function (error, results) {
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
function getPostById(id) {
    var defer = promist.defer();
    var query = conn.query('Select * from posts where  ?',{id:id}, function (error, posts) {
        if (error) {
            console.log(error)
            defer.reject(error);
        }
        else {          
            defer.resolve(posts);
        }
        // Neat!
    });
    return defer.promise;
}
function updatePost(params) {
    if (params) {
        var defer = promist.defer();
        var query = conn.query('Update posts SET title = ? , content = ? , author = ?,update_at = ? where id = ?', [params.title,params.content,params.author,new Date(),params.id], function (error, results) {
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
function deletePost(id) {
    if (id) {
        var defer = promist.defer();
        var query = conn.query('Delete from posts where id = ?', [id], function (error, results) {
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
module.exports = {
    getAllPosts: getAllPosts,
    addPost:addPost,
    getPostById:getPostById,
    updatePost:updatePost,
    deletePost:deletePost
}