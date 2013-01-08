var spawn = require('child_process').spawn
var fs = require('fs');

var arduino = require('duino')
var tako = require('tako')
var app = tako()


  app.route('/client/*').files(__dirname + '/client');
  app.httpServer.listen(8000)

  
  var f = fs.readdirSync('./music')
  var i = 0
  var delay = 500

  var player = {}
  var playing = false

  app.sockets.on('connection', function (socket) {
    app.sockets.emit('message', { message: f[i]});
  })

  display(f[i])
  
  var board = new arduino.Board({
  //  debug: true
  });

  sensor0 = new arduino.Sensor({
    board: board,
    pin: 'A0'
  });

  sensor1 = new arduino.Sensor({
    board: board,
    pin: 'A1'
  });

  sensor0.on('read', function(err, value) {
    // Up
    if (value > 890) {
      if (i > 0) i--
      display(f[i])
      stopFile()
      playFile(f[i])
      board.delay(delay)
    }
    // Down
    if (value < 15) {
      if (i < (f.length - 1)) i++
      display(f[i])
      stopFile()
      playFile(f[i])
      board.delay(delay)
    }
  });

  sensor1.on('read', function(err, value) {
  // Right
  if (value < 15) {
    display(f[i])
    stopFile()
    playFile(f[i])
    board.delay(delay)  
  }
  // Left
  if (value > 890) {
    display(f[i])
    stopFile()
    board.delay(delay)  
  }
  });


  function display(msg) {
    app.sockets.emit('message', { message: msg});
  }

  function playFile(f) {
    player = spawn('play', ['./music/' + f])      
    playing = true
  }

  function stopFile() {
    if (playing && player.pid) {
      process.kill(player.pid)
      playing = false
    }
  }