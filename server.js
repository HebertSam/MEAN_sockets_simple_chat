const express = require('express');
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index')
})

const server = app.listen(8000, function(){
    console.log('listening on port 8000')
})

const io = require('socket.io').listen(server)

io.sockets.on('connection', function(socket){
    console.log('Client/socket is connected');
    console.log('client/socket id is', socket.id)
    socket.on('user1Req', function(data){
        console.log('someone clicked a button! reson:', data.reason)
        socket.emit('user1Res', {response: data.reason})
    })
    socket.on('user2Req', function(data){
        socket.emit('user2Res', {response: data.reason})
    })
})