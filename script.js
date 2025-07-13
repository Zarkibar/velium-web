const socket = io("https://f4c777e8-51d7-4b7f-96b8-92f38f8ae228-00-37flna8c9t0hi.picard.replit.dev:3000/")

// Function to add a new message to the chat
function addMessage(username, message, isSystem = false) {
    const chatDisplay = document.getElementById('chat-display');
    const messageElement = document.createElement('div');
    
    messageElement.classList.add('message');
    if (isSystem) {
        messageElement.classList.add('system-message');
    }
    
    messageElement.textContent = `${username}: ${message}`;
    chatDisplay.appendChild(messageElement);
    
    // Scroll to the bottom
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Function to handle input submission
function handleSubmitOld() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        addMessage("USER", message);
        
        // Clear input
        input.value = '';
        
        // Simulate system response after a delay
        setTimeout(() => {
            const responses = [
                "Message received",
                "Roger that",
                "Affirmative",
                "Copy that",
                "10-4"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage("SYSTEM", randomResponse, true);
        }, 1000);
    }
}

socket.on("user_joined", username => {
    addMessage("SYSTEM", `${username} has joined the chat`, true);
});

socket.on('message', data => {
    addMessage(data.username, data.text, false);
});

socket.on("user_left", username => {
    addMessage("SYSTEM", `${username} has left us`, true);
});

socket.emit("set_username", "Guest");

function handleSubmit(){
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        socket.emit('message', message);
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

// Add initial messages to create retro feel
setTimeout(() => {
    addMessage("SYSTEM", "Initializing chat protocol...", true);
}, 500);

setTimeout(() => {
    addMessage("SYSTEM", "Establishing secure connection...", true);
}, 1000);

setTimeout(() => {
    addMessage("SYSTEM", "Connection established. Ready to chat!", true);
}, 1500);