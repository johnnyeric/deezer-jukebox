var path = require('path');
var express = require('express');

var app = express();
app.use(express.static(__dirname)); //Don't think this is required, only if we decide to move server.js into a new folder

var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

var trackList = null;

//Serve client.htm on /
app.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname, 'client.htm'));
});

//Serve admin.htm on /admin
app.get('/admin', function(req, res) { 
    res.sendFile(path.join(__dirname, 'admin.htm'));
});

//Serve server.htm on /server
app.get('/server', function(req, res) { 
    res.sendFile(path.join(__dirname, 'server.htm'));
});

io.on('connection', function(socket) {
    console.log('a user connected');
    
    socket.on('new song', function(track) {
        io.emit('new song', track); //Broadcast new song to all connected clients
    });
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    
    socket.on('new tracklist', function(tracks){
        console.log("New tracklist received.");
        trackList = tracks;
        io.emit('client tracklist', tracks);
    });
    
    socket.on('request tracklist', function() {
        console.log("Track list requested.");
        io.emit("client tracklist", trackList);
    });
    
    socket.on("controls-play", function() {
       console.log("Play command received");
        io.emit("controls-play", null);
    });
    socket.on("controls-pause", function() {
       console.log("Pause command received");
        io.emit("controls-pause", null);
    });
    socket.on("controls-next", function() {
       console.log("Next command received");
        io.emit("controls-next", null);
    });
    socket.on("controls-prev", function() {
       console.log("Prev command received");
        io.emit("controls-prev", null);
    });
    socket.on("controls-volume", function(volume) {
       console.log("Volume change command received");
        io.emit("controls-volume", volume);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});