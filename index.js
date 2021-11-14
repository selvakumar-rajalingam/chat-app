const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html')
});

io.on('connection', (socket)=>{
    console.log('User connected!');
    socket.on('disconnect', ()=>{
        console.log('User disconnected!')
    });
    socket.on('sendmsg', (msg)=>{
        console.log(msg);
        io.emit('msgdisp', msg);
    })
})

const port = process.env.PORT || 1111;

server.listen(port, ()=>console.log('listening at 1111'));