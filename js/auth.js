let openedTab = 0;

function openGuestTab(){
    const loginPage = document.getElementById("login");
    loginPage.className = "tab-content";
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.className = "tab-btn";
    
    const registerPage = document.getElementById("register");
    registerPage.className = "tab-content";
    const registerBtn = document.getElementById("registerBtn");
    registerBtn.className = "tab-btn";

    const guestPage = document.getElementById("guest");
    guestPage.className = "tab-content active";
    const guestBtn = document.getElementById("guestBtn");
    guestBtn.className = "tab-btn active";

    openedTab = 0;
}

function openLoginTab(){
    const loginPage = document.getElementById("login");
    loginPage.className = "tab-content active";
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.className = "tab-btn active";

    const registerPage = document.getElementById("register");
    registerPage.className = "tab-content";
    const registerBtn = document.getElementById("registerBtn");
    registerBtn.className = "tab-btn";

    const guestPage = document.getElementById("guest");
    guestPage.className = "tab-content";
    const guestBtn = document.getElementById("guestBtn");
    guestBtn.className = "tab-btn";

    openedTab = 1;
}

function openRegisterTab(){
    const loginPage = document.getElementById("login");
    loginPage.className = "tab-content";
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.className = "tab-btn";
    
    const registerPage = document.getElementById("register");
    registerPage.className = "tab-content active";
    const registerBtn = document.getElementById("registerBtn");
    registerBtn.className = "tab-btn active";

    const guestPage = document.getElementById("guest");
    guestPage.className = "tab-content";
    const guestBtn = document.getElementById("guestBtn");
    guestBtn.className = "tab-btn";

    openedTab = 2;
}

function connectGuest(event){
    event.preventDefault(); // Stop form submission

    const input = document.getElementById("guest-username");
    const username = input.value.trim();

    console.log(`${username} has been logged in`);
    veliumStorage.setUsername(username);

    console.log("entering chat..");
    
    window.location.href = '../chat/chat.html';
}

function login(event){}

function register(event){}