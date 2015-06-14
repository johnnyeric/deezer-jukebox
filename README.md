# deezer-jukebox
Currently very alpha
Use Deezer on another computer as a multi-user jukebox from your browser. Perfect for offices with a shared set of speakers.
Unauthenticated clients can only queue tracks (up to DJ_MAX_UNAUTHED_TRACKS).
Admins have full control of the player including volume, next/prev etc.

##Packages used
* NodeJS
* Socket.io
* Topcoat CSS Framework - http://topcoat.io
* Font Awesome

##To Do & Bugs
* Rewrite front end in React.js
* When player reaches end of playlist, we can't start it again using DZ.player.play() - DZ.player.isPlaying() returns true. 
* Login / Guest page (admin username/password will be hard coded for the time being)
* Player controls for admins
* Implement max number of tracks you can queue at any one time (DJ_MAX_UNAUTHED_TRACKS) for unauthenticated users

Possible work around is to append a known obscure track to the playlist, if DZ.player.getCurrentTrack() returns this track then we should pause.
* Tidy up the front end.