const {Client, CommandInteraction, MessageEmbed, Permissions} = require("discord.js");
const xox = require("discord-tictactoe");
const game = new xox({ language: "en", commandOptionName:"user"})

module.exports = {
    name:"tictactoe",
    description:"oyun",
    type:1,
    options:[
        {
            name:"user",
            description:"oynayacak arkadaşını seç",
            type:6,
            required:false
            
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        game.handleInteraction(interaction);
    }
}