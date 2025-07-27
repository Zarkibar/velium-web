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

socket.emit("register_page", {username, page: "chat"});

socket.on("user_joined_in_chat", username => {
    addMessage(`${username} has joined the chat`, true);
});

socket.on("user_left_in_chat", username => {
    addMessage(`${username} has left the chat`, true);
    remove_conversation(username);
});

socket.on("user_joined_in_posts", username => {
    addMessage(`${username} is visiting posts`, true);
});

socket.on("user_left_in_posts", username => {
    addMessage(`${username} has left posts`, true);
});

socket.on('get_all_username', (usernames) => {
    usernames.forEach((username) => {
        add_conversation(username);
    });
});

socket.on('message', msg => {
    console.log(msg)
    addMessage(msg, false);
});

socket.on('loadChats', chats => {
    chats.forEach((chat) => {
        addMessage(chat.message, false);
    });
})

socket.on('user_count', users => {
    document.getElementById('user-count').textContent = users;
});

function add_conversation(username) {
    const convo_list = document.getElementById('convo-list');
    const new_convo = document.createElement('button');

    new_convo.classList.add('convo');
    new_convo.textContent = username;

    convo_list.appendChild(new_convo);
}

function remove_conversation(username) {
    const convo_list = document.getElementById('convo-list');
    const conversations = convo_list.querySelectorAll('.convo');
    
    conversations.forEach(convo => {
        if (convo.textContent === username) {
            // Optional: Add fade-out animation before removal
            convo.style.opacity = '0';
            convo.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                convo.remove();
            }, 300); // Match timeout duration to CSS transition
        }
    });
}

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

document.getElementById('message-input').addEventListener('input', () => {
    if (!isTyping) {
        isTyping = true;
        socket.emit('typing', username);
    }
    
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        isTyping = false;
        socket.emit('stop_typing', username);
    }, TYPING_DELAY);
});

document.getElementById("send-message-btn").onclick = () => {
    handleSubmit();
}

// Set current date in status bar
const now = new Date();
const formattedDate = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
document.getElementById('current-date').textContent = formattedDate;

function toggle_convo(btn){
    if (btn.classList.contains('active')){
        btn.classList.remove('active');
        document.getElementById('convo-list').classList.remove('active');
    } else {
        btn.classList.add("active");
        document.getElementById('convo-list').classList.add('active');
    }
}

// Close menu when clicking outside
// document.addEventListener('click', function(event) {
//     if (event.target.closest('.chat-container')) {
//         document.querySelectorAll('.convo-list').forEach(menu => {
//             menu.classList.remove('active');
//         });
//     }
// });

setTimeout(() => {
    addMessage("SYSTEM: Connection established. Ready to chat!", true);
}, 500);