window.SocketManager = {
  socket: null,
  connect() {
    if (!this.socket) {
      this.socket = io("https://3329246d-d81b-4e46-9245-8141cdffb567-00-1y46zj9v09b24.picard.replit.dev");
    }
    return this.socket;
  }
};