"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerEmbed = void 0;
const discord_js_1 = require("discord.js");
const constants_1 = require("../../../lib/constants");
function getPlayerEmbed(message, data) {
    const msg = new discord_js_1.MessageEmbed()
        .setAuthor(message.member?.user.username, message.guild?.iconURL({ dynamic: true }))
        .setColor(constants_1.COLORS.purple)
        .setTitle(data.username);
    for (const [key, value] of Object.entries(data.perfs)) {
        msg.addField(key, value, true);
        console.log(key, value.games);
    }
    return msg;
}
exports.getPlayerEmbed = getPlayerEmbed;
//# sourceMappingURL=embed.js.map