var fs = require('fs');

var tako = require('tako')
var app = tako()
var keypress = require('keypress')

app.route('/music/*').files(__dirname + '/music');
app.route('/').file(__dirname + '/client/index.html');
app.route('/*').files(__dirname + '/client');

app.httpServer.listen(8000)


var files = [
  {files:['music/2.mp3']},
  {files:['music/3.mp3']}
]

app.sockets.on('connection', function (socket) {
  app.sockets.emit('queue', { files: files});

  keypress(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('keypress', function (ch, key) {
    if (key && key.name == 'q') {
      app.sockets.emit('play')        
    } 
    if (key && key.name == 'w') {
      app.sockets.emit('prev')        
    }  
    if (key && key.name == 'e') {
      app.sockets.emit('next')        
    }
    if (key && key.ctrl && key.name == 'c') {
      process.stdin.setRawMode(false);
      process.stdin.pause();
    }
  });

})
