var express = require("express");
var helper = require("../Helpers/helper");
var router = express.Router();
var user_md = require("../Models/user");
var post_md = require("../Models/post");
router.get("/", function (req, res) {
    if (req.session.user) {
        res.render("admin/dashboard", { data: { error: false } });
    }
    else {
        res.render("login", { data: {} });
    }

});
router.get("/signup", function (req, res) {
    res.render("signup", { data: {} });
});
router.post("/signup", function (req, res) {
    var user = req.body;
    if (user.email.trim().length == 0) {
        res.render("signup", { data: { error: "Email không được để trống" } })
        return;
    }
    if (user.password != user.password_conf || user.password.trim().length == 0 || user.password_conf.trim().length == 0) {

        res.render("signup", { data: { error: "Password không hợp lệ" } })
        return;
    }
    //Insert database
    var hash_password = helper.hash_password(user.password)
    user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        tel: user.tel,
        password: hash_password,
    }

    var results = user_md.addUser(user);
    results.then(function (data) {
        res.redirect("/admin/login");
    }).catch(function (errorSignup) {
        res.render("signup", { data: { error: errorSignup } });
    })

})
router.get("/login", function (req, res) {
    res.render("login", { data: {} });
});
router.post("/login", function (req, res) {
    var params = req.body;
    if (params.email.trim().length == 0) {
        res.render("login", { data: { error: "Bạn chưa nhập Email" } });
    }
    else {
        var data = user_md.getUserByEmail(params.email);

        data.then(function (users) {
            var user = users[0];
            if (users[0]) {
                var status = helper.compare_password(params.password, user.password)
                if (!status) {
                    res.render("login", { data: { error: "Sai  mật khẩu vui lòng đăng nhập lại" } });
                }
                else {
                    req.session.user = user
                    console.log(req.session.user)
                    res.redirect("/admin/");
                }
            }
            if (users[0] == null) {
                res.render("login", { data: { error: "Sai  email vui lòng đăng nhập lại" } });
            }


        })

    }
})
router.get("/posts", function (req, res) {
    if (req.session.user) {
        var data = post_md.getAllPosts();
        data.then(function (posts) {
            var data = {
                posts: posts,
                error: false
            }
            res.render("admin/posts", { data: data });
        }).catch(function (err) {
            res.render("admin/posts", { data: { error: "Get Post data is Error" } })
        });
    }
    else {
        res.render("login", { data: {} });
    }


});
router.get("/post/new", function (req, res) {
    if (req.session.user) {
        res.render("admin/post/new", { data: {} })
    }
    else {
        res.render("login", { data: {} });
    }
});
router.post("/post/new", function (req, res) {
    var params = req.body;
    var now = new Date();
    params.create_at = now;
    params.update_at = now;
    if (params.title.trim().length == 0) {
        var data = {
            error: "Hãy nhập tiêu đề"
        };
        res.render("admin/post/new", { data: data });
    }
    else {
        var data = post_md.addPost(params);
        data.then(function (result, err) {
            if (err) {
                var data = {
                    error: err
                };
                res.render("admin/post/new", { data: data });
            }
            else {
                res.redirect("/admin/posts");
            }
        }).catch(function (errorAdd) {
            res.render("admin/post/new", { data: { errorAdd: errorAdd } });
        })
    }

});
router.get("/post/edit/:id", function (req, res) {
    if (req.session.user) {
        var params = req.params
        var id = params.id;
        var data = post_md.getPostById(id)
        if (data) {
            data.then(function (posts) {
                var post = posts[0];
                var data = {
                    post: post,
                    error: false
                };
                res.render("admin/post/edit", { data: data });
            }).catch(function (errorGet) {
                res.render("admin/post/edit", { data: { errorGet: errorGet } });
            })
        }
        else {
            var data = {
                error: "Không thể tìm thấy bài viết"
            };
            res.render("admin/post/edit", { data: data });
        }
    }
    else {
        res.render("login", { data: {} });
    }

});
router.put("/post/edit", function (req, res) {
    var params = req.body;
    data = post_md.updatePost(params);
    if (!data) {
        res.json({ status_code: 500 })
    }
    else {
        data.then(function (posts) {
            res.json({ status_code: 200 })
        }).catch(function (errorGet) {
            res.json({ status_code: 500 })
        })
    }

})
router.delete("/post/delete", function (req, res) {
    var post_id = req.body.id;
    var data = post_md.deletePost(post_id);
    if (!data) {
        res.json({ status_code: 500 })
    }
    else {
        data.then(function (posts) {
            res.json({ status_code: 200 })
        }).catch(function (errorGet) {
            res.json({ status_code: 500 })
        })
    }

})
router.get("/users", function (req, res) {
    if (req.session.user) {
        var users = user_md.getAllUser()
        users.then(function (users) {
            var data = {
                users: users,
                error: false
            }

            res.render("admin/users", { data: data })
        }).catch(function (errorGet) {
            var data = {
                error: errorGet
            };
            res.render("admin/users", { data: data })
        })
    }
    else {
        res.render("login", { data: {} });
    }
});
module.exports = router;
