const express = require('express');
const http = require('http')
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        // HTTP Server
        this.server = http.createServer(this.app);

        // Sockets
        this.io = socketio( this.server, {/** Configuraciones */});
    }

  

    execute() {
        
        // Inicializar middlewares
        this.middlewares()

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar server
        this.server.listen(this.port, () => {
            console.log(`Server corriendo en http://localhost:${this.port}`)
        })
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        
        // CORS
        this.app.use(cors())
    }
    
    configurarSockets() {
        new Sockets( this.io );
    }
}

module.exports = Server;