const socket = SocketManager.connect();

const postBtn = document.getElementById("post-btn");
const postContent = document.getElementById("post-content");
const postFeed = document.getElementById("post-feed");
const postError = document.getElementById("post-error");

postBtn.addEventListener("click", () => {
    const content = postContent.value.trim();

    if (!content) {
        postError.textContent = "Post cannot be empty.";
        return;
    }

    postError.textContent = ""; // Clear errors

    const postDiv = document.createElement("div");
    postDiv.className = "post";

    const now = new Date();
    const formattedTime = now.toLocaleString("en-US");

    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-username">YOU</div>
            <div class="post-time">${formattedTime}</div>
        </div>
        <div class="post-content">${escapeHTML(content)}</div>
    `;

    // Insert the post at the top of the feed
    postFeed.insertBefore(postDiv, postFeed.firstChild);

    postContent.value = ""; // Clear textarea
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