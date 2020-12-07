"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const index_1 = require("../index");
const getValueFromDB_1 = require("./getValueFromDB");
async function log(type, embed, server) {
    const channelId = await getValueFromDB_1.getValueFromDB("servers", `${type}s_channel`, { server_id: server.id });
    const isActive = await getValueFromDB_1.getValueFromDB("servers", `${type}s_active`, { server_id: server.id });
    if (!channelId || !isActive) {
        return;
    }
    const channel = (await index_1.client.channels.fetch(channelId));
    if (!channel) {
        return;
    }
    if (channel.guild !== server) {
        return console.error(`Provided log channel belongs to ${channel.guild.name} (${channel.guild.id}) \
			but has been called from ${server.name} (${server.id}).`);
    }
    try {
        await channel.send(embed);
    }
    catch { }
}
exports.log = log;
//# sourceMappingURL=log.js.map