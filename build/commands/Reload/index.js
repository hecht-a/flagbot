"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../classes/Command");
const CommandError_1 = require("../../exceptions/CommandError");
const ArgumentError_1 = require("../../exceptions/ArgumentError");
const constants_1 = require("../../lib/constants");
const getValueFromDB_1 = require("../../functions/getValueFromDB");
class Reload extends Command_1.Command {
    constructor(client) {
        super({
            name: "reload",
            description: "Reload a command",
            category: "Bot owner",
            usage: (prefix) => `${prefix}reload <command>`,
            permission: "BOT_OWNER",
        }, client);
    }
    async run(message, args) {
        const prefix = await getValueFromDB_1.getValueFromDB("servers", "prefix", { server_id: message.guild?.id });
        if (!args[0]) {
            throw new ArgumentError_1.ArgumentError(`Argument missing. Usage: ${this.informations.usage?.(prefix)}`);
        }
        const commandName = args[0].toLowerCase();
        const command = this.client.commands.get(commandName) || this.client.aliases.get(commandName);
        if (!command) {
            throw new CommandError_1.CommandError(`Command \`${args[0]}\` not found.`);
        }
        try {
            await this.client.reloadCommand(command);
        }
        catch (error) {
            throw new CommandError_1.CommandError(error.message);
        }
        const embed = new discord_js_1.MessageEmbed()
            .setColor(constants_1.COLORS.lightGreen)
            .setDescription(`✅ Command ${command.informations.name} reloaded.`);
        await message.channel.send(embed);
    }
}
exports.default = Reload;
//# sourceMappingURL=index.js.map