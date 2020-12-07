"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeavingMessageActiveEmbed = void 0;
const discord_js_1 = require("discord.js");
const constants_1 = require("../../../../lib/constants");
const getValueFromDB_1 = require("../../../../functions/getValueFromDB");
async function getLeavingMessageActiveEmbed(message) {
    const active = await getValueFromDB_1.getValueFromDB("servers", "leaving_message_active", { server_id: message.guild?.id });
    return new discord_js_1.MessageEmbed()
        .setAuthor("Configuration Editor - Leaving message active", message.guild?.iconURL({ dynamic: true }))
        .setColor(constants_1.COLORS.purple)
        .setDescription(`Leaving message active? ${Boolean(active)}`)
        .addField("🔄 Toggle", "Toggle the actual value", true)
        .addField("🚪 Return", "Return to the main menu", true);
}
exports.getLeavingMessageActiveEmbed = getLeavingMessageActiveEmbed;
//# sourceMappingURL=embed.js.map