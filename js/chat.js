const socket = SocketManager.connect();

const username = veliumStorage.getUsername()

// Function to add a new message to the chat
function addMessage(message, isSystem = false) {
    const chatDisplay = document.getElementById('chat-display');
    const messageElement = document.createElement('div');
    
    messageElement.classList.add('message');
    if (isSystem) {
        messageElement.classList.add('system-message');
    }
    
    messageElement.textContent = message;
    chatDisplay.appendChild(messageElement);
    
    // Scroll to the bottom
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

socket.on("user_joined", username => {
    addMessage(`${username} has joined the chat`, true);
});

socket.on('message', msg => {
    console.log(msg)
    addMessage(msg, false);
});

socket.on("user_left", username => {
    addMessage(`${username} has left the chat`, true);
});

function handleSubmit(){
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        socket.emit('message', `${username}: ${message}`);
        input.value = '';
    }
}

// Set up event listeners
document.getElementById('message-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
});

document.getElementById("send-message-btn").onclick = () => {
    handleSubmit();
}

// Set current date in status bar
const now = new Date();
const formattedDate = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
document.getElementById('current-date').textContent = formattedDate;

setTimeout(() => {
    addMessage("SYSTEM: Connection established. Ready to chat!", true);
}, 500);