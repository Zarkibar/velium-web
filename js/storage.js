window.veliumStorage = {
  getUsername() {
    const name = localStorage.getItem('retroChatUsername')
    if (name == null){
        return this.generateRandomUsername();
    }

    return name
  },
  
  setUsername(username) {
    localStorage.setItem('retroChatUsername', username);
    this.dispatchUsernameChange();
  },
  
  generateRandomUsername() {
    const prefixes = ["Cyber", "Retro", "Net", "Digital"];
    const suffixes = ["Surfer", "Pioneer", "Hacker", "Wizard"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${prefix}${suffix}${Math.floor(Math.random() * 100)}`;
  },
  
  // Optional: Notify other files when username changes
  usernameChangeCallbacks: [],
  
  onUsernameChange(callback) {
    this.usernameChangeCallbacks.push(callback);
  },
  
  dispatchUsernameChange() {
    const username = this.getUsername();
    this.usernameChangeCallbacks.forEach(cb => cb(username));
  }
};