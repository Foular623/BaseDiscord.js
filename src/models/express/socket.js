class Sockets {

    constructor( io, client ) {
        this.io = io;
        this.client = client;
        this.socketsEvents();
    }

    socketsEvents() {
        this.io.on('connection', ( socket ) => {
            console.log( socket );
        });
    }
}

module.exports = Sockets;