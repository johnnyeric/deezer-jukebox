# deezer-jukebox
* Currently very alpha
* Use Deezer on another computer as a multi-user jukebox from your browser. Perfect for offices with a shared set of speakers.
* Unauthenticated clients can only queue tracks up to a defined maximum at once.
* Admins have full control of the player including volume, next/prev etc.

##Packages used
* NodeJS
* Socket.io
* Topcoat CSS Framework - http://topcoat.io
* Font Awesome

##To Do & Bugs
* Rewrite front end in React.js
* When player reaches end of playlist, it won't start if you add another track.
* No login page yet
* No player controls for admins
* No max queued tracks yet.
* Front end needs tidying up.

##How to use
* Install NodeJS from https://nodejs.org/
* Open port 3000 on the server machine (the one with speakers)
* Make sure you have a web server running on server machine
* Add all files to a directory on web server
* Run node app.js on the server machine & open http://localhost:3000/server.
* Open http://ip_address:3000/client on a client machine