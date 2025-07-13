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
    const prefixes = [
        "Happy",
        "Swift",
        "Bright",
        "Silent",
        "Mystic",
        "Jolly",
        "Clever",
        "Fierce",
        "Gentle",
        "Lucky",
        "Witty",
        "Brave",
        "Calm",
        "Daring",
        "Eager",
        "Fancy",
        "Gleaming",
        "Humble",
        "Icy",
        "Jovial",
        "Kind",
        "Lively",
        "Mighty",
        "Nimble",
        "Ominous",
        "Proud",
        "Quirky",
        "Radiant",
        "Sly",
        "Tranquil",
        "Mystical",
        "Hairy",
    ];
    const suffixes = [
        "Panda",
        "Dragon",
        "River",
        "Star",
        "Whisper",
        "Fox",
        "Shadow",
        "Moon",
        "Storm",
        "Leaf",
        "Phoenix",
        "Mountain",
        "Ocean",
        "Thunder",
        "Serpent",
        "Raven",
        "Glacier",
        "Comet",
        "Tiger",
        "Willow",
        "Falcon",
        "Vortex",
        "Lotus",
        "Wolf",
        "Harmony",
        "Blaze",
        "Cascade",
        "Echo",
        "Gale",
        "Orchid",
        "Nigger",
        "Nigga",
    ];
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