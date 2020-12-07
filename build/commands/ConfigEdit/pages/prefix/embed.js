"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrefixEmbed = void 0;
const discord_js_1 = require("discord.js");
const constants_1 = require("../../../../lib/constants");
const getValueFromDB_1 = require("../../../../functions/getValueFromDB");
async function getPrefixEmbed(message) {
    const prefix = await getValueFromDB_1.getValueFromDB("servers", "prefix", { server_id: message.guild?.id });
    return new discord_js_1.MessageEmbed()
        .setAuthor("Configuration Editor - Prefix", message.guild?.iconURL({ dynamic: true }))
        .setColor(constants_1.COLORS.purple)
        .setDescription(`Current prefix: ${prefix}`)
        .addField("✏ Edit", "Edit the prefix", true)
        .addField("🚪 Return", "Return to the main menu", true);
}
exports.getPrefixEmbed = getPrefixEmbed;
//# sourceMappingURL=embed.js.map