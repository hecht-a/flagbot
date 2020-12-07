"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeavingMessageEmbed = void 0;
const discord_js_1 = require("discord.js");
const constants_1 = require("../../../../lib/constants");
const getValueFromDB_1 = require("../../../../functions/getValueFromDB");
async function getLeavingMessageEmbed(message) {
    const text = await getValueFromDB_1.getValueFromDB("servers", "leaving_message_text", { server_id: message.guild?.id });
    return new discord_js_1.MessageEmbed()
        .setAuthor("Configuration Editor - Leaving message", message.guild?.iconURL({ dynamic: true }))
        .setColor(constants_1.COLORS.purple)
        .setDescription(`Current message:\n${text}`)
        .addField("✏ Edit", "Edit the message", true)
        .addField("🚪 Return", "Return to the main menu", true);
}
exports.getLeavingMessageEmbed = getLeavingMessageEmbed;
//# sourceMappingURL=embed.js.map