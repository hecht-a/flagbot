"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const getValueFromDB_1 = require("../../functions/getValueFromDB");
const log_1 = require("../../functions/log");
const constants_1 = require("../../lib/constants");
const Event_1 = require("../../classes/Event");
class Command extends Event_1.Event {
    constructor(client) {
        super("channelUpdate", client);
    }
    async listener(oldChannel, newChannel) {
        if (!this.client.operational
            || !(oldChannel instanceof discord_js_1.GuildChannel)
            || !(newChannel instanceof discord_js_1.GuildChannel)) {
            return;
        }
        const logsActive = await getValueFromDB_1.getValueFromDB("servers", "logs_active", { server_id: newChannel.guild.id });
        if (!logsActive) {
            return;
        }
        const newTextChannel = newChannel;
        const oldTextChannel = oldChannel;
        const channelReference = newChannel.type !== "voice" && newChannel.type !== "category"
            ? newChannel
            : newChannel.name;
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor("Channel Updated", newChannel.guild.iconURL({ dynamic: true }))
            .setColor(constants_1.COLORS.gold)
            .addField("**Channel**", channelReference, true)
            .addField("**Type**", newChannel.type, true)
            .setTimestamp(Date.now());
        if (oldChannel.name !== newChannel.name) {
            embed.addField("**Old name**", oldChannel.name);
        }
        if (oldTextChannel.topic !== newTextChannel.topic) {
            if (oldTextChannel.topic) {
                embed.addField("**Old topic**", oldTextChannel.topic);
            }
            if (newTextChannel.topic) {
                embed.addField("**New topic**", newTextChannel.topic);
            }
        }
        if (oldChannel.parent !== newChannel.parent) {
            embed
                .addField("**Old parent**", oldChannel.parent, false)
                .addField("**New parent**", newChannel.parent, true);
        }
        if (oldTextChannel.nsfw !== newTextChannel.nsfw) {
            embed
                .addField("**Old NSFW state**", oldTextChannel.nsfw, false)
                .addField("**New NSFW state**", newTextChannel.nsfw, true);
        }
        if (embed.fields.length === 2) {
            return;
        }
        await log_1.log("log", embed, newChannel.guild);
    }
}
exports.default = Command;
//# sourceMappingURL=index.js.map