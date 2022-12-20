const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Le da al Pong"),
     execute: async (interaction) => {
        interaction.reply("Pong!");
   }
}
