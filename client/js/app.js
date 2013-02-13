var socket = io.connect();

var files = []
var current = 0
var playing = false
var howl = {}

socket.on('queue', function (data) {
  files = data.files
  howl = new Howl({urls: files[current].files})
});


socket.on('play', function (data) {
  if (!playing) {
    howl.play()
    playing = true 
  } else {
    howl.pause()
    playing = false 
  }
});


socket.on('next', function (data) {
  console.log('next 1', current, files.length)
  current = (current < files.length - 1) ? current + 1 : current
  //current++
  howl.urls(files[current].files)
  console.log(howl.urls(), current)
});

socket.on('prev', function (data) {
  current = (current > 0) ? current - 1 : current
  howl.urls(files[current].files)
  console.log(howl.urls())
});


/*
var files = []

socket.on('queue', function (data) {
  data.files.forEach(function(item) {
    var howl = new Howl({urls: [item.file]})
    files.push({file: item.file, howl: howl})    
  })
});

var current = 0

socket.on('play', function (data) {
  console.log('play', current)
  files[current].howl.play()  
});

socket.on('stop', function (data) {
  console.log('stop', current)
  files[current].howl.stop()  
});

socket.on('next', function (data) {
  files[current].howl.stop()
  current = (current < files.length - 1) ? current++ : cu
  console.log('next', current)  
  files[current].howl.play()  
});

socket.on('prev', function (data) {
  files[current].howl.stop()
  current--
  console.log('prev', current)  
  files[current].howl.play()  
});
*/