"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const getValueFromDB_1 = require("../../functions/getValueFromDB");
const log_1 = require("../../functions/log");
const constants_1 = require("../../lib/constants");
const Event_1 = require("../../classes/Event");
class Command extends Event_1.Event {
    constructor(client) {
        super("channelDelete", client);
    }
    async listener(channel) {
        if (!this.client.operational || !(channel instanceof discord_js_1.GuildChannel)) {
            return;
        }
        const logsActive = await getValueFromDB_1.getValueFromDB("servers", "logs_active", { server_id: channel.guild.id });
        if (!logsActive) {
            return;
        }
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor("Channel Deleted", channel.guild.iconURL({ dynamic: true }))
            .setColor(constants_1.COLORS.lightRed)
            .addField("**Channel**", channel.name, true)
            .addField("**Type**", channel.type, true)
            .setTimestamp(Date.now());
        await log_1.log("log", embed, channel.guild);
    }
}
exports.default = Command;
//# sourceMappingURL=index.js.map