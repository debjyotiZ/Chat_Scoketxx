

/*
var app = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
*/

var express = require('express');
var app = express.createServer();
console.log("fine1");
/*   server = require('http').createServer(app);
   server.listen(process.env.PORT || 5000); */
    sio = require('socket.io');

app.listen(port, function () {
  var addr = app.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  request.sendFile('index.html');
});
var io = sio.listen(app)
io.configure(function () { 
io.set('transports', ['xhr-polling']);
io.set('polling duration', 10);
});
/*io.on('connection', function(socket){
  
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
*/

io.sockets.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    socket.broadcast.emit('chat message', socket.nickname, msg);
  });

  
});

console.log("fine3");
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
