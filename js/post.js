const socket = SocketManager.connect();

const postBtn = document.getElementById("post-btn");
const postContent = document.getElementById("post-content");
const postFeed = document.getElementById("post-feed");
const postError = document.getElementById("post-error");

const username = veliumStorage.getUsername();

function clearPosts(){
    const posts = document.getElementsByClassName("post");

    while (posts.length > 0) {
        posts[0].remove();
    }
}

function loadPost(author, content, time){
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-username">${author}</div>
            <div class="post-time">${time}</div>
        </div>
        <div class="post-content">${escapeHTML(content)}</div>
    `;

    // Insert the post at the top of the feed
    postFeed.insertBefore(postDiv, postFeed.firstChild);
}

postBtn.addEventListener("click", () => {
    const content = postContent.value.trim();
    postContent.value = ""; // Clear textarea

    if (!content) {
        postError.textContent = "Post cannot be empty.";
        return;
    }
    
    postError.textContent = ""; // Clear errors

    const now = new Date();
    const formattedTime = now.toLocaleString("en-US");

    socket.emit("post", {username, content: content, time: formattedTime});
});

socket.emit("register_page", {username, page: "posts"});

socket.on("loadPosts", (posts) => {
    clearPosts();
    posts.forEach(post => {
        loadPost(post.username, post.content, post.time);
    });
});

// Prevent HTML injection
function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}