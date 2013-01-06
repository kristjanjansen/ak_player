var fs = require('fs')
var mi = require('mediainfo')
var tako = require('tako')


var app = tako()
app.httpServer.listen(8000)

var f = fs.readdirSync('./files')
var f2 = fs.readdirSync('./files/images')

i = 1

app.sockets.on('connection', function (socket) {

  mi('./files/' + f[i], function(err, data) {
      app.sockets.emit('track', { 
        track_name: data[0].track_name,
        album: data[0].album,
        performer: data[0].performer,
        image: '../files/images/' + f2[i]
      })
    })

})
  

/*
var i = id3(fs.readFileSync(f[0]))
console.log(i)
*/