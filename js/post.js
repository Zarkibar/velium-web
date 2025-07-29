const socket = SocketManager.connect();

const postBtn = document.getElementById("post-btn");
const postContent = document.getElementById("post-content");
const postFeed = document.getElementById("post-feed");
const postError = document.getElementById("post-error");

const username = veliumStorage.getUsername();

function requestDeletePost(id){
    socket.emit("deletePost", id);
    deletePost(id);
}

function deletePost(id){
    post = document.getElementById(`post-id${id}`);
    post.remove();
}

function editPost(id) {
    postId = `post-id${id}`;
    // console.log('Editing post:', postId);
    // const post = document.getElementById(postId);
    // const content = post.querySelector('.post-content').textContent;
    
    // // Replace content with editable textarea
    // post.querySelector('.post-content').innerHTML = `
    //     <textarea class="edit-textarea">${content}</textarea>
    //     <div class="edit-buttons">
    //         <button class="save-edit" onclick="saveEdit('${postId}')">Save</button>
    //         <button class="cancel-edit" onclick="cancelEdit('${postId}')">Cancel</button>
    //     </div>
    // `;
}
// function saveEdit(postId) {
//     const post = document.getElementById(postId);
//     const newContent = post.querySelector('.edit-textarea').value;
//     post.querySelector('.post-content').textContent = newContent;
// }

// function cancelEdit(postId) {
//     const post = document.getElementById(postId);
//     // In a real app, you would restore the original content from your data store
//     post.querySelector('.post-content').textContent = "Welcome to Velium! If you're seeing this post, check your internet connection.";
// }

function reportPost(id) {
    postId = `post-id${id}`;
    console.log('Reporting post:', postId);
    alert(`Post ${postId} has been reported.`);
}

function clearPosts(){
    const posts = document.getElementsByClassName("post");

    while (posts.length > 0) {
        posts[0].remove();
    }
}

function loadPost(post_id, author, content, time){
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.id = `post-id${post_id}`;

    editBtnHTML = `<button class="post-option" onclick="editPost('${post_id}')">Edit</button>`;
    deleteBtnHTML = `<button class="post-option danger" onclick="requestDeletePost('${post_id}')">Delete</button>`;
    if (username !== author) {
        deleteBtnHTML = "";
        editBtnHTML = "";
    }

    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-username">${author}</div>
            <div class="post-time">${time}</div>
            <div class="post-options">
                <button class="post-options-btn">⋮</button>
                <div class="post-options-menu">
                    ${editBtnHTML}
                    ${deleteBtnHTML}
                    <button class="post-option danger" onclick="reportPost('${post_id}')">Report</button>
                </div>
            </div>
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

    loadPost(0, username, content, formattedTime);
    socket.emit("post", {username, content: content, time: formattedTime});
});

socket.emit("register_page", {username, page: "posts"});

socket.on("loadPosts", (posts) => {
    clearPosts();
    posts.forEach(post => {
        loadPost(post.id, post.username, post.content, post.time);
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

const autoResize = () => {
      document.getElementById('post-content').style.height = 'auto'; // Reset height
      document.getElementById('post-form').style.height = (document.getElementById('post-content').scrollHeight + 30) + 'px';
};
document.getElementById('post-content').addEventListener('input', autoResize);

// Toggle options menu when clicking the options button
document.addEventListener('click', function(event) {
    // Close all other open menus first
    document.querySelectorAll('.post-options-menu.show').forEach(menu => {
        if (!menu.contains(event.target) && !event.target.closest('.post-options-btn')) {
            menu.classList.remove('show');
        }
    });
    
    // Toggle the clicked menu
    if (event.target.classList.contains('post-options-btn')) {
        const menu = event.target.nextElementSibling;
        menu.classList.toggle('show');
    }
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.post-options')) {
        document.querySelectorAll('.post-options-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    }
});

loadPost(3, 'Lorem Ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris elit turpis, consectetur vel ipsum ac, rutrum porttitor nulla. Duis laoreet, metus non placerat congue, tellus leo finibus purus, a gravida turpis ipsum in mauris. Integer non posuere nibh. Vestibulum et mattis dolor. Vivamus pretium felis ac rutrum pulvinar. Pellentesque faucibus tincidunt ex, a feugiat eros placerat at. Duis feugiat ipsum et est vestibulum, eget blandit tellus ornare. Nulla eget arcu venenatis, rhoncus tellus a, tincidunt nulla.', '29/7/2025 11:41 PM');
loadPost(3, 'Jack The Ripper', 'Morbi vestibulum libero quis imperdiet aliquet. Donec pulvinar tellus in massa egestas tempor. Mauris a nibh ac ipsum rhoncus lacinia sit amet id elit. Aenean venenatis dolor sed dui volutpat, eget luctus sem aliquam. Fusce sit amet ipsum tincidunt, venenatis arcu at, ullamcorper mi. Curabitur eu augue ut dolor efficitur auctor vel a metus. Vivamus a blandit magna. Nam accumsan egestas ultricies. Vivamus pellentesque ex a nibh aliquet, sed dictum ipsum posuere. Interdum et malesuada fames ac ante ipsum primis in faucibus.', '29/7/2025 11:41 PM');
loadPost(3, 'Epstein', 'why do children scream so much?', '29/7/2025 11:41 PM');