module.exports = function (io) {
    var usernames = [];
    io.sockets.on("connection", function name(socket) {
        console.log("Have a new user connect")

        //Listen adduser event
        socket.on("adduser", function (username) {
            //Save
            socket.username = username;
            usernames.push(username);

            //Notify to my save
            var data = {
                sender: "SERVER",
                message: "You have join chat room"
            };

            socket.emit("update_message", data)
            //Notify to orther user
            var data = {
                sender: "SERVER",
                message: username + " Have join to chat room"
            };
            socket.broadcast.emit("update_message", data)

        })
        
        //Listen send_message event
        socket.on("send_message", function (message) {
            //Notify to myself
            var data = {
                sender: "You",
                message: message
            }
            socket.emit("update_message", data)
            ////Notify to order user
            var data = {
                sender: socket.username,
                message: message
            }
            socket.broadcast.emit("update_message", data);
        });

        //Listen disconnect event
        socket.on("disconnect" , function () {
            //Delet username
            for(var i = 0;i<usernames.length;i++)
            {
                if(usernames[i] == socket.username)
                {
                    usernames.splice(i,1);
                }
            }
            //Notify to oder user
            var data = {
                sender:"SERVER",
                message:socket.username + " left chat room"
            }
            socket.broadcast.emit("update_message", data);
        })
    });

}