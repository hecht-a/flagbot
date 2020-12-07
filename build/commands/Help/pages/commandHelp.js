"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandHelp = void 0;
const discord_js_1 = require("discord.js");
const CommandError_1 = require("../../../exceptions/CommandError");
const config = require("../../../config.json");
const PermissionError_1 = require("../../../exceptions/PermissionError");
const constants_1 = require("../../../lib/constants");
async function commandHelp(message, args, client, prefix) {
    const command = client.commands.get(args[0].toLowerCase());
    if (!command) {
        throw new CommandError_1.CommandError(`Command ${args[0]} not found.`);
    }
    const { name, description, usage, aliases, permission, category, } = command.informations;
    if (permission === "BOT_OWNER" && message.author.id !== config.botOwner) {
        throw new PermissionError_1.PermissionError("You do not have permission to see this command.");
    }
    if (permission && !message.member?.hasPermission(permission)) {
        throw new PermissionError_1.PermissionError("You do not have permission to see this command.");
    }
    const commandEmbed = new discord_js_1.MessageEmbed()
        .setColor(constants_1.COLORS.lightGreen)
        .setThumbnail(client.user?.displayAvatarURL({ dynamic: true }))
        .setFooter(`Asked by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setAuthor("Help - Command informations")
        .setTitle(`**${prefix}${name} ─ ${category}**`);
    if (description) {
        commandEmbed.addField("**Description**", description);
    }
    const usageString = usage?.(prefix) || prefix + name;
    commandEmbed.addField("**Usage**", usageString);
    if (aliases?.length > 0) {
        commandEmbed.addField("**Aliases**", aliases?.join(", "));
    }
    if (permission) {
        commandEmbed.addField("**Permission**", permission);
    }
    await message.channel.send(commandEmbed);
}
exports.commandHelp = commandHelp;
//# sourceMappingURL=commandHelp.js.map