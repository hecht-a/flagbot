"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJoiningRoleActiveEmbed = void 0;
const discord_js_1 = require("discord.js");
const constants_1 = require("../../../../lib/constants");
const getValueFromDB_1 = require("../../../../functions/getValueFromDB");
async function getJoiningRoleActiveEmbed(message) {
    const active = await getValueFromDB_1.getValueFromDB("servers", "joining_role_active", { server_id: message.guild?.id });
    return new discord_js_1.MessageEmbed()
        .setAuthor("Configuration Editor - Joining role active", message.guild?.iconURL({ dynamic: true }))
        .setColor(constants_1.COLORS.purple)
        .setDescription(`Joining role active? ${Boolean(active)}`)
        .addField("🔄 Toggle", "Toggle the actual value", true)
        .addField("🚪 Return", "Return to the main menu", true);
}
exports.getJoiningRoleActiveEmbed = getJoiningRoleActiveEmbed;
//# sourceMappingURL=embed.js.map