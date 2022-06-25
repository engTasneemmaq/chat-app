"use strict"

const express = require("express");
const app = express();

// const http=require("http");
// const server=http.createServer(app);

const server= require("http").createServer(app)
const io =require("socket.io")(server)

app.set("views", "./views");
app.use(express.static("./views"));


app.get("/",handelHome);

function handelHome (req,res)  {
 res.render("index.html")
};

io.on("connection", socket  => {
    // console.log("webSocket connection open");
    // console.log(socket);

    // socket: connection clint with server
  socket.on("send-message", data =>{
    // socket.emit("send-message" , data);

    // if i need send msg to all localhost i used
    // io.socket connection with all socket with connect at the same server
    io.sockets.emit("send-message" , data)

    // if i need to send msg to all socket but i didnt need to see it on my websitesocket 
    //  socket.broadcast connection with all sockets except socket im on it
    socket.broadcast.emit("send-message" , data)
  })
})

server.listen(3000);