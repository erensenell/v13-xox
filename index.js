const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");
const {Client,Collection} = require('discord.js');
const client = new Client({intents:647});

const token = "";

global.client = client;
client.commands = (global.commands = []);

fs.readdir("./komutlar/", (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./komutlar/${file}`);

        client.commands.push({
             name: props.name.toLowerCase(),
             description: props.description,
             options: props.options,
             type: props.type,  
        })
        console.log(`👌 Slash Komut Yüklendi: ${props.name}`);
    });
});
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        
        console.log(`👌 Event yüklendi: ${eventName}`);
        client.on(eventName, (...args) => {
           event(client, ...args);
        });
    });
});

client.on("ready",async () => {
    console.log("Ready!");
    client.user.setActivity("Tic Tac Toe", {type:"WATCHING"});
    const rest = new REST({ version: "10" }).setToken(token);
    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: commands,
      });
    } catch (error) {
      console.error(error);
    }
})
client.login(token);