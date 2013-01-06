var socket = io.connect('http://localhost:8000');

socket.on('track', function (data) {
  console.log(data);
  $('.track img').attr('src', data.image)
  $('.track .track-name').text(data.track_name)
});
