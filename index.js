var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');
	

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Send current time to all connected clients
function sendTime() {
   
   	var messages=["Good Shot", "Missed to field", "Classic Text Book Shot", "Hat trick", " Classical Sot", "Unbelievable miss", "Very good catch by mid-on player"];
   	var msg1 = messages[Math.floor(Math.random() * messages.length)];
   	var score=[4,6,1,2];
	var num =  score[Math.floor(Math.random() * score.length)];
	//console.log (num); 
	if( num==4 || num==6){
	 io.emit('messe', num + "."+msg1);
	}
	else
		{
		var msg2=" "
		io.emit('messe', num + "."+ msg2);
		}
}
// Send current time every 10 secs
setInterval(sendTime, 10000);

// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });
    	
    socket.on('i am client', console.log);
    socket.on('end', function (){
	    socket.disconnect(0);
	});
});

app.listen(3000);