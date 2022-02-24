class Sockets {
  constructor(io) {
    this.io = io;
    this.clients = {};
    this.socketEvents();
  }

  socketEvents() {
    console.log(`launch socketEvents`);
    // On conection
    this.io.on("connection", (socket) => {
      console.log(`Cliente conectado! id: ${socket.id}`);
      socket.emit("mensaje-bienvenida", {
        msg: "bienvenido al server",
        fecha: new Date(),
      });

      //escuchar evento mensaje-to-server
      socket.on("mensaje-to-server", (data) => {
        console.log(data);
        this.io.emit("mensaje-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
