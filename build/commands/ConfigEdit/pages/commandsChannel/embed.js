"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandsChannelEmbed = void 0;
const discord_js_1 = require("discord.js");
const constants_1 = require("../../../../lib/constants");
const getValueFromDB_1 = require("../../../../functions/getValueFromDB");
const fetchGuildChannel_1 = require("../../functions/fetchGuildChannel");
async function getCommandsChannelEmbed(message) {
    const channelId = await getValueFromDB_1.getValueFromDB("servers", "commands_channel", { server_id: message.guild?.id });
    const channel = fetchGuildChannel_1.fetchGuildChannel(message.guild, channelId) || "<no channel defined>";
    return new discord_js_1.MessageEmbed()
        .setAuthor("Configuration Editor - Commands channel", message.guild?.iconURL({ dynamic: true }))
        .setColor(constants_1.COLORS.purple)
        .setDescription(`Current channel: ${channel}`)
        .addField("✏ Edit", "Edit the channel (mention or id)", true)
        .addField("🚪 Return", "Return to the main menu", true);
}
exports.getCommandsChannelEmbed = getCommandsChannelEmbed;
//# sourceMappingURL=embed.js.map