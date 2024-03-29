const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Http Server
    this.server = http.createServer(this.app);

    //sockets configuration
    this.io = socketio(this.server, {
      /** configutaciones */
    });
    console.log(`server created`);
  }

  middlewares() {
    //desplegar el directorio public
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();
    this.configurarSockets();
    this.server.listen(this.port, () => {
      console.log(`running in port 8080`);
    });
  }
}

module.exports = Server;
