var socket = io.connect('http://localhost:8000');

socket.on('message', function (data) {
  console.log(data);
  $('#message').text(data.message)
  $('img').attr('src', data.image)
});
