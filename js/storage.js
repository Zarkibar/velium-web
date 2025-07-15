window.veliumStorage = {
  getUsername() {
    return localStorage.getItem('veliumUsername')
  },
  
  setRandomUsername() {
    localStorage.setItem('veliumUsername', this.generateRandomUsername());
  },

  setUsername(username){
    localStorage.setItem('veliumUsername', username);    
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
};