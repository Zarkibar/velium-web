const socket = SocketManager.connect();

const username = veliumStorage.getUsername();

let lastSentMessage = null;

// Function to add a new message to the chat
function addNewMessage(username, message, self=false) {
    const chatDisplay = document.getElementById('chat-display');
    const messageElement = document.createElement('div');
    let sender = 'other';
    if (self) sender = 'me';
    
    messageElement.classList.add('message');
    messageElement.classList.add(sender);
    
    messageElement.innerHTML = `
        <div class="username">${username}</div>
        <div class="message-content ${sender}">${message}</div>
    `;

    chatDisplay.appendChild(messageElement);
    
    // Scroll to the bottom
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

    return messageElement;
}

function addMessage(username, message, self=false){
    if (!lastSentMessage) {
        lastSentMessage = addNewMessage(username, message, self);
        return;
    }

    if (lastSentMessage.children[0].textContent !== veliumStorage.getUsername()){
        lastSentMessage = addNewMessage(username, message, self);
        return;
    }

    let sender = 'other';
    if (self) sender = 'me';

    const newMessage = document.createElement('div');
    newMessage.classList.add('message-content');
    newMessage.classList.add(sender);
    newMessage.textContent = message;

    lastSentMessage.append(newMessage);
}

function addSystemMessage(message){
    const chatDisplay = document.getElementById('chat-display');
    const messageElement = document.createElement('div');
    
    messageElement.classList.add('message');
    messageElement.classList.add('message-content');
    messageElement.classList.add('system-message');
    
    messageElement.textContent = message;
    chatDisplay.appendChild(messageElement);
    
    // Scroll to the bottom
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

socket.emit("register_page", {username, page: "chat"});

socket.on("user_joined_in_chat", username => {
    addSystemMessage(`${username} has joined the chat`);
});

socket.on("user_left_in_chat", username => {
    addSystemMessage(`${username} has left the chat`);
});

socket.on("user_joined_in_posts", username => {
    addSystemMessage(`${username} is visiting posts`);
});

socket.on("user_left_in_posts", username => {
    addSystemMessage(`${username} has left posts`);
});

socket.on('get_all_username', (usernames) => {
    console.log(usernames);
    remove_conversation(username);
    usernames.forEach((username) => {
        add_conversation(username);
    });
});

socket.on('message', (data) => {
    console.log(`${data.username}: ${data.message}`);
    addMessage(data.username, data.message);
});

socket.on('loadChats', chats => {
    chats.forEach((chat) => {
        // addMessage(chat.message, false);
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
        socket.emit('message', {username, message});
        addMessage(username, message, true);
        input.value = '';
    }
}

// Set up event listeners
document.getElementById('message-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
});

let isTyping = false;
let typingTimer = 0;
let TYPING_DELAY = 1500;

socket.on('typing', (username) => {
    if (username != veliumStorage.getUsername())
        document.getElementById('typing-indicator').style.opacity = 1.0
});

socket.on('stop_typing', (username) => {
    if (username != veliumStorage.getUsername())
        document.getElementById('typing-indicator').style.opacity = 0.0
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
    addSystemMessage("Connection established. Ready to chat!");
}, 500);

// setTimeout(() => {
//     addMessage(username, "Helloo", true);
// }, 1000);

// setTimeout(() => {
//     addMessage(username, "Hey there! how are you doing?");
// }, 3000);