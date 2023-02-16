const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js'); 
const path = require('path');
const fs = require('fs');
const ExpressApi = require('./models/express');

require('dotenv').config();


    
(async () => {
    try {
        const client = new Client({ 
            intents: [
                GatewayIntentBits.Guilds, 
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });

        // Event Handle

        const eventsPath = path.join(__dirname, 'events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.event.js'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
        
        // ==================================

        // Command Handle

        client.commands = new Collection();
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.command.js'));

        const commands = [];
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        }

        // ======================================

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

        await rest.put(Routes.applicationGuildCommands(process.env['CLIENT_ID'], process.env['GUILD_ID']), {
            body: commands
        });   
        
        var express = new ExpressApi('12345', process.env.PORT, client);

        client.login(process.env.TOKEN);
    } catch (err) {
        console.error(err);
    }
})();


