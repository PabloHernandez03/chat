// Make connection
var socket = io.connect('https://chat-ayf5.onrender.com');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', sendMessage);

message.addEventListener('keypress', function(event){
    if(handle.value!=""){
        socket.emit('typing', handle.value);
    }else{
        socket.emit('typing', handle.value);
    }
    if(event.key === "Enter"){
        sendMessage();
    }
})

handle.addEventListener("keypress", function(event){
    if(message.value!=""){
        socket.emit('typing', handle.value+event.key);
    }
})

handle.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === "Backspace") {
        if(message.value!=""){
            handle.value = handle.value.substring(0,(handle.value.length-1))
            socket.emit('typing', handle.value);
        }
    }
});

//Functions
function sendMessage(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    if(handle.value!=""){
        message.value = "";
    }
}

// Listen for events
socket.on('chat', function(data){
    if(data.handle!="" && data.message!=""){
        feedback.innerHTML = '';
        output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    }
});

socket.on('typing', function(data){
    if(data!=""){
        feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    }else{
        feedback.innerHTML = "<p></p>";
    }
});
