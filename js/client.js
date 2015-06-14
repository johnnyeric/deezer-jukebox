var socket = io();

function searchTracks(query) {
    $.ajax({
        method: "GET",
        jsonp: "callback",

        //expecting JSONP (cross-domain)
        dataType: "jsonp",
        data: {
            format: "json"
        },
        crossDomain: true,
        url: 'http://api.deezer.com/search/?q=' + query + '&index=0&limit=15&output=jsonp',
        success: function (response) {
            if (response.data.length) {

                //Empty list incase we've searched before this one
                $("#results-list").empty();

                for(var i=0; i<response.data.length; i++) {
                    var track = response.data[i];   //ith track from results
                    var source = track.id;        //Track url

                    //Add a new <li> element to results
                    $("#results-list").append("<li><button class='topcoat-icon-button'>" +
                                              "<span class='fa fa-plus'></span></button><span class='title'>" + track.title + 
                                              "</span><span class='artist'>" + track.artist.name + 
                                              "</span><span class='album'>" + track.album.title + "</span></li>");
                    //Save track object to data
                    $("#results-list li:last-child button").data("track", track);

                }
                //Now make the play <button>s clickable
                $("#results-list li button").click(function() {
                    socket.emit('new song', $(this).data("track") );
                });
            }
        }
    });
}

function updateClientPlayQueue(tracks) {
    if(tracks != null) {

        console.log("Updating play queue");

        //Empty the queue
        $("#play-queue").empty();

        //Update track list on client page
        var trackList = tracks;
        for(var i=0; i<trackList.length; i++) {
            $("#play-queue").append("<li><button class='topcoat-icon-button'>" + 
                                    "<span class='fa fa-arrow-right'></span></button>" + 
                                    "<span class='title'>" + trackList[i].title + "</span>" + 
                                    "<span class='artist'>" + trackList[i].artist.name + "</span>" + 
                                    "<span class='album'>" + trackList[i].album.title + "</span>" + 
                                    "</li>");
        }
    }
}

//When enter is pressed with search bar in focus, search for tracks
$("#search").keypress(function(e) {
    if(e.which == 13) {
        searchTracks($(this).val());
    }
});

socket.on('client tracklist', function(tracks){
    console.log("New tracklist received.");
    updateClientPlayQueue(tracks);
});

$(window).load(function() {
    socket.emit("request tracklist", null);
});