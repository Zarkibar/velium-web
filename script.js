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

// Function to handle input submission
function handleSubmit() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        addMessage(`USER: ${message}`);
        
        // Clear input
        input.value = '';
        
        // Simulate system response after a delay
        setTimeout(() => {
            const responses = [
                "SYSTEM: Message received",
                "SYSTEM: Roger that",
                "SYSTEM: Affirmative",
                "SYSTEM: Copy that",
                "SYSTEM: 10-4"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, true);
        }, 1000);
    }
}

// Set up event listeners
document.getElementById('message-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
});

// Set current date in status bar
const now = new Date();
const formattedDate = `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`;
document.getElementById('current-date').textContent = formattedDate;

// Add initial messages to create retro feel
setTimeout(() => {
    addMessage("SYSTEM: Initializing chat protocol...", true);
}, 500);

setTimeout(() => {
    addMessage("SYSTEM: Establishing secure connection...", true);
}, 1000);

setTimeout(() => {
    addMessage("SYSTEM: Connection established. Ready to chat!", true);
}, 1500);