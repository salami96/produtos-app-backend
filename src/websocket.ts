const socketio = require('socket.io');

let io: any;
let connections: string[] = [];

exports.setupWebsocket = (server: any) => {
    io = socketio(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket: any) => {
        io.emit('connections', io.engine.clientsCount)

        //Whenever someone disconnects this piece of code executed
        socket.on('disconnect', function () {
            io.emit('connections', io.engine.clientsCount)
        });
    });
}

exports.sendMessage = (message: string, data: any[]) => {
    io.emit(message, data);
}