"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJoiningMessageActiveEmbed = void 0;
const discord_js_1 = require("discord.js");
const constants_1 = require("../../../../lib/constants");
const getValueFromDB_1 = require("../../../../functions/getValueFromDB");
async function getJoiningMessageActiveEmbed(message) {
    const active = await getValueFromDB_1.getValueFromDB("servers", "joining_message_active", { server_id: message.guild?.id });
    return new discord_js_1.MessageEmbed()
        .setAuthor("Configuration Editor - Joining message active", message.guild?.iconURL({ dynamic: true }))
        .setColor(constants_1.COLORS.purple)
        .setDescription(`Joining message active? ${Boolean(active)}`)
        .addField("🔄 Toggle", "Toggle the actual value", true)
        .addField("🚪 Return", "Return to the main menu", true);
}
exports.getJoiningMessageActiveEmbed = getJoiningMessageActiveEmbed;
//# sourceMappingURL=embed.js.map