window.SocketManager = {
  socket: null,
  connect() {
    if (!this.socket) {
      // this.socket = io("http://localhost:5000");
      this.socket = io("https://present-mandy-zarkibar-5eb7dfec.koyeb.app/");
    }
    return this.socket;
  }
};