var socket = io();

DZ.init({
    appId  : '159261',
    channelUrl : 'http://localhost/misterSpot/mistaSpot/channel.php',
    player: {
        container: 'player',
        width : 400,
        height : 108,
        format : 'horizontal',
        onload : function() {
            console.log("Deezer loaded");
        }
    }
});

//Add a new song to the playlist
//If first track, play it
//Else append to playlist
socket.on("new song", function(track) {
    console.log("New track received: " + track.title );
    //If we're not already playing, play the track
    if(!DZ.player.isPlaying()) { 
        DZ.player.playTracks([track.id]);
    }
    else {
        //Else add the incoming song to Deezer queue
        DZ.player.addToQueue([track.id]);
        DZ.player.play();
    }

    setTimeout(updatePlayQueues, 1000);
});

function updatePlayQueues() {
    console.log("Updating play queue");
    
    //Empty the queue
    $("#play-queue").empty();
    
    //Grab tracklist from Deezer and remove any already played tracks (index is less than current)
    var trackList = DZ.player.getTrackList(); //Actual list
    var currentTrackIndex = DZ.player.getCurrentIndex();
    var newTrackList = []; //New list which we will use to update play queue display on server and client
    
    for(var i=0; i < trackList.length; i++) {
        if(i >= currentTrackIndex) {
            
            newTrackList.push(trackList[i]);
            
            $("#play-queue").append("<li><button class='topcoat-icon-button'>" + 
                                    "<span class='fa fa-arrow-right'></span></button>" + 
                                    "<span class='title'>" + trackList[i].title + "</span>" + 
                                    "<span class='artist'>" + trackList[i].artist.name + "</span>" + 
                                    "<span class='album'>" + trackList[i].album.title + "</span>" + 
                                    "</li>");
            
        }
    }
    
    socket.emit('new tracklist', newTrackList);
}

//Admin player controls
socket.on("controls-play", function() {
    DZ.player.play();
});
socket.on("controls-pause", function() {
    DZ.player.pause();
});
socket.on("controls-next", function() {
    DZ.player.next();
});
socket.on("controls-prev", function() {
    DZ.player.prev();
});
socket.on("controls-volume", function(volume) {
    console.log("Setting volume to " + volume);
    DZ.player.setVolume(volume);
});

//Listen for position in track
//If this is the last song in the queue
//Stop when we're < 2 secs away from the end
//Unable to use DZ.player.play() otherwise
DZ.Event.subscribe('player_position', function(arg) {
    console.log(arg[1] - arg[0] + " seconds remaining");
    if(arg[1] - arg[0] < 2.5) {
        if(DZ.player.getCurrentIndex() == DZ.player.getTrackList().length - 1) {
            console.log("End of last track in playlist - pausing");
            DZ.player.pause();
        }
    }
});

//Listen for tracklist change and play the player if so
//This doesn't seem to get fired - no idea why, it's in the SDK docs
DZ.Event.subscribe('tracklist_changed', function() {
    console.log("Tracklist changed.");
});

//Listen for change of current track and update local play queue
//And send updated play queue to clients
DZ.Event.subscribe('current_track', function(evt_name) {
    console.log("Beginning new track.");
    //Update the play queue
    setTimeout(updatePlayQueues, 1000);
    
});

$(document).ready(function() {
    
});