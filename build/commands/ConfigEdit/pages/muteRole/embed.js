"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMuteRoleEmbed = void 0;
const discord_js_1 = require("discord.js");
const constants_1 = require("../../../../lib/constants");
const getValueFromDB_1 = require("../../../../functions/getValueFromDB");
const fetchRole_1 = require("../../functions/fetchRole");
async function getMuteRoleEmbed(message) {
    const roleId = await getValueFromDB_1.getValueFromDB("servers", "mute_role_id", { server_id: message.guild?.id });
    const role = fetchRole_1.fetchRole(message.guild, roleId) || "<no role defined>";
    return new discord_js_1.MessageEmbed()
        .setAuthor("Configuration Editor - Mute role", message.guild?.iconURL({ dynamic: true }))
        .setColor(constants_1.COLORS.purple)
        .setDescription(`Current role: ${role}`)
        .addField("✏ Edit", "Edit the role (mention or id)", true)
        .addField("🚪 Return", "Return to the main menu", true);
}
exports.getMuteRoleEmbed = getMuteRoleEmbed;
//# sourceMappingURL=embed.js.map