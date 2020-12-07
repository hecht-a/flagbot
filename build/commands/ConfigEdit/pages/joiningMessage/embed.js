"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJoiningMessageEmbed = void 0;
const discord_js_1 = require("discord.js");
const constants_1 = require("../../../../lib/constants");
const getValueFromDB_1 = require("../../../../functions/getValueFromDB");
async function getJoiningMessageEmbed(message) {
    const text = await getValueFromDB_1.getValueFromDB("servers", "joining_message_text", { server_id: message.guild?.id });
    return new discord_js_1.MessageEmbed()
        .setAuthor("Configuration Editor - Joining message", message.guild?.iconURL({ dynamic: true }))
        .setColor(constants_1.COLORS.purple)
        .setDescription(`Current message:\n${text}`)
        .addField("✏ Edit", "Edit the message", true)
        .addField("🚪 Return", "Return to the main menu", true);
}
exports.getJoiningMessageEmbed = getJoiningMessageEmbed;
//# sourceMappingURL=embed.js.map