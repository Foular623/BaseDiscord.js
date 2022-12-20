// Fuente: https://github.com/zekroTutorials/DiscordWebsocket/blob/master/ws/ws.js

const express = require('express')
const bodyParser = require("body-parser");

// Aclaro. ESTO NO ES WEBSOCKET. ES UN API REST (auque cumple con lo que busco)

/**
 * Websocket class.
 * @param {string}         token  Token to authenticate at the web interface
 * @param {number}         port   Port to access web interface
 * @param {discord.Client} client Discord client instance to access the discord bot
 */
class ExpressDiscord {

    constructor(token, port, client) {
        this.token = token
        this.port = port
        this.client = client
        this.app = express()

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.registerRoots()

        // Start websocket on port defined in constructors arguments
        this.server = this.app.listen(port, () => {
            console.log("Websocket API set up at port " + this.server.address().port);
            console.log("http://localhost:"+this.server.address().port+"/")
        })
    }

    /**
     * Compare passed token with the token defined on
     * initialization of the websocket
     * @param {string} _token Token from request parameter 
     * @returns {boolean} True if token is the same
     */
    checkToken(_token) {
        return (_token == this.token)
    }

    /**
     * Register root pathes
     */
    registerRoots() {
        this.app.get('/', (req, res) => {
            res.json({"Code": 200, "msg": "Se ve mi pana" });
        })
    
        this.app.post('/sendMessage', (req, res) => {
            res.json({"Code": 200, "msg": "Se envia mi pana" });
        })
            
    }

}

module.exports = ExpressDiscord