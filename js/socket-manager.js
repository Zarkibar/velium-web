window.SocketManager = {
  socket: null,
  connect() {
    if (!this.socket) {
      this.socket = io("https://f4c777e8-51d7-4b7f-96b8-92f38f8ae228-00-37flna8c9t0hi.picard.replit.dev:3000/");
    }
    return this.socket;
  }
};