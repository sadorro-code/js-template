const Command = require('../../util/command');

module.exports = class extends Command {
    name = "ping";
    description = "Ping command";
    usage = "";

    async run(message) {
        await message.reply({ content: 'Pong!' })
    }
};