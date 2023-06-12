const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { 
    registerCommands,
    loadCommands
} = require('./util/registerCommands');
require('dotenv').config();

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
        // enable intents in dev portal, then provide intents THAT YOU ONLY NEED
    ]
});

bot.commands = new Collection();
bot.on('ready', () => {
    loadCommands(bot);
    registerCommands(bot);

    console.log(`${bot.user.username} is ready!`)
});

bot.on('interactionCreate', async i => {
   if (!i.isChatInputCommand()) return;

   const command = bot.commands.get(interaction.commandName);
   if (!command) return;

    if (command.ownerOnly) {
        await interaction.reply({ content: 'this command is only for owners.', ephemeral: true });
        return
    }
    
    try {
	await command.run(interaction);
    } catch (error) {
	console.error(error);
	if (interaction.replied || interaction.deferred) {
	   await interaction.followUp({ content: 'there was an error while executing this command.', ephemeral: true });
	} else {
	   await interaction.reply({ content: 'there was an error while executing this command.', ephemeral: true });
	}
   }
});

bot.login(process.env.DISCORD_TOKEN)
