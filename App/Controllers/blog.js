var express = require("express");
var router = express.Router();
var post_md = require("../Models/post")
router.get("/",function (req,res) {
    // res.json({"message":"This is Blog page"})
    var data = post_md.getAllPosts();
    data.then(function (posts) {
        var result = {
            posts:posts,
            error:false
        };
        res.render("blog/index",{data:result})
    }).catch(function (err) {
        var result = {
            error:err
        };
        console.log(err)
        res.render("blog/index",{data:result})
    })
   
});
router.get("/post/:id",function(req,res) {
    var data = post_md.getPostById(req.params.id)
    data.then(function (posts) {
        var post = posts[0];
        var result = {
            post:post,
            error:false
        };
        res.render("blog/post",{data: result}) 
    }).catch(function (err) {
        var result = {
            error:err
        };
        console.log(err)
        res.render("blog/post",{data:result})
    })   
});
router.get("/about",function (req, res) {
    res.render("blog/about");
})
router.get("/contact",function (req, res) {
    res.render("blog/404page");
})
module.exports = router;
