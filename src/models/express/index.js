// Fuente: https://github.com/zekroTutorials/DiscordWebsocket/blob/master/ws/ws.js

const express       = require('express');
const bodyParser    = require("body-parser");
const cors          = require('cors');
const http          = require('http');
const socketIo      = require('socket.io');
const Sockets       = require('./socket');

/**
 * Websocket class.
 * @param {string}         token  Token to authenticate at the web interface
 * @param {number}         port   Port to access web interface
 * @param {discord.Client} client Discord client instance to access the discord bot
 */
class ExpressDiscord {

    constructor(token, port, client) {
        this.token = token;
        this.port = port;
        this.client = client;
        this.app = express();
        this.server = http.createServer( this.app );
        this.io = socketIo( this.server );

        this.execute();
    }

    socketsConfigure() {
        new Sockets( this.io, this.client );
    }

    middlewave() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use( cors() );
    }


    execute() {
        this.middlewave();
        this.socketsConfigure();
        // Start websocket on port defined in constructors arguments
        this.server.listen(this.port, () => {
            console.log("Websocket API set up at port " + this.server.address().port);
        });
    }

}

module.exports = ExpressDiscord;