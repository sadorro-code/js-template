const path = require('node:path');
const fs = require('node:fs');

module.exports.loadCommands = (bot) => {
    const categories = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(categories);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            bot.commands.set(command.data.name, command);
        }
    }
}

module.exports.registerCommands = async (bot) => {
    console.log('started registering slash commands');

    await rest.put(
        Routes.applicationCommands(bot.user.id),
        { body: commands },
    );
}