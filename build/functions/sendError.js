"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
const constants_1 = require("../lib/constants");
const react_1 = require("./react");
const collectReaction_1 = require("./collectReaction");
async function sendError(message, error) {
    const embed = new discord_js_1.MessageEmbed()
        .setAuthor("Error", index_1.client.user?.displayAvatarURL({ dynamic: true }))
        .setColor(constants_1.COLORS.darkRed)
        .setDescription(error);
    const errorMessage = await message.channel.send(embed).catch(() => { });
    if (!errorMessage) {
        return;
    }
    await react_1.react("🔍", errorMessage);
    const filter = (reaction, user) => reaction.message.id === errorMessage.id
        && user === message.author
        && !user.bot
        && reaction.emoji.name === "🔍";
    const reaction = await collectReaction_1.collectReaction(errorMessage, filter, {
        max: 1,
        time: 10000,
    });
    if (!reaction) {
        await errorMessage.reactions.removeAll();
        return;
    }
    // V8 actually writes error.message inside error.stack, so I remove it
    const stackTrace = error.stack?.split("\n").slice(1).join("\n");
    const completeEmbed = new discord_js_1.MessageEmbed(embed).setDescription(`${error}\`\`\`${stackTrace}\`\`\``);
    await errorMessage.edit(completeEmbed);
    await errorMessage.reactions.removeAll();
}
exports.sendError = sendError;
//# sourceMappingURL=sendError.js.map