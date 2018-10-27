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
                defer.resolve(posts.rows);
            }
            // Neat!
        });
        return defer.promise;
}
function addPost(data) {
    if (data) {
        var datas = [];
        datas.push(data.title,data.content,data.author,new Date(),new Date());
        var defer = promist.defer();
        var query = conn.query('INSERT INTO public.posts(title, content, author, create_at, update_at) VALUES ($1, $2, $3, $4, $5)', datas, function (error, results) {
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
function getPostById(id) {
    var defer = promist.defer();
    var query = conn.query('Select * from posts where id = $1',[id], function (error, posts) {
        if (error) {
            console.log(error)
            defer.reject(error);
        }
        else {          
            defer.resolve(posts.rows);
        }
        // Neat!
    });
    return defer.promise;
}
function updatePost(params) {
    if (params) {
        var defer = promist.defer();
        var query = conn.query('Update posts SET title = $1 , content = $2 , author = $3 ,update_at = $4 where id = $5', [params.title,params.content,params.author,new Date(),params.id], function (error, results) {
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
function deletePost(id) {
    if (id) {
        var defer = promist.defer();
        var query = conn.query('Delete from posts where id = $1', [id], function (error, results) {
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
module.exports = {
    getAllPosts: getAllPosts,
    addPost:addPost,
    getPostById:getPostById,
    updatePost:updatePost,
    deletePost:deletePost
}