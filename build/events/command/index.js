"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../../classes/Event");
const getValueFromDB_1 = require("../../functions/getValueFromDB");
const config = require("../../config.json");
const sendError_1 = require("../../functions/sendError");
class Command extends Event_1.Event {
    constructor(client) {
        super("message", client);
    }
    async listener(message) {
        if (!this.client.operational || message.author.bot || !message.guild) {
            return;
        }
        if (message.author.partial) {
            await message.author.fetch();
        }
        if (message.member?.partial) {
            await message.member.fetch();
        }
        const prefix = await getValueFromDB_1.getValueFromDB("servers", "prefix", { server_id: message.guild.id });
        if (!message.content.startsWith(prefix)) {
            return;
        }
        // eslint-disable-next-line max-len
        const commandsChannel = await getValueFromDB_1.getValueFromDB("servers", "commands_channel", { server_id: message.guild.id });
        if (commandsChannel && message.channel.id !== commandsChannel) {
            // eslint-disable-next-line max-len
            const msg = await message.reply(`You aren't in the ${message.guild?.channels.cache.get(commandsChannel)} channel.`);
            msg.delete({ timeout: 3000 });
            return;
        }
        const [commandName, ...args] = message.content.slice(prefix.length).split(/\s+/);
        const commandNameLower = commandName.toLowerCase();
        const command = this.client.commands.get(commandNameLower) || this.client.aliases.get(commandNameLower);
        if (!command) {
            return;
        }
        const isOwner = command.informations.permission
            && command.informations.permission.toUpperCase() === "BOT_OWNER"
            && message.author.id === config.botOwner;
        if (!command.informations.permission
            || isOwner
            || message.member?.hasPermission(command.informations.permission)) {
            try {
                await message.delete();
            }
            catch { }
            try {
                await command.run(message, args);
            }
            catch (error) {
                try {
                    await sendError_1.sendError(message, error);
                }
                catch { }
            }
        }
    }
}
exports.default = Command;
//# sourceMappingURL=index.js.map