const express = require('express');
const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var users = [];
var connections = [];

server.listen(3000);

app.get("/", function(req, res) {
    // route for localhost:3000/
    res.sendFile(__dirname + "/index.html");
})

io.sockets.on("connection", function(socket) {
    // when the client connects to the server
    connections.push(socket);
    console.log("connected :  %s sockets connected", connections.length);
    socket.on("disconnect", function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnect : %s socket connected", connections.length);

    });
    socket.on("send message",function(data){
        console.log(data);
        io.sockets.emit("new message",{msg:data});

    });

});
console.log("Sever is listening!!!!")