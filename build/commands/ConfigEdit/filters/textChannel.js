"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextChannelFilter = void 0;
const fetchGuildChannel_1 = require("../functions/fetchGuildChannel");
const getChannelIdFromString_1 = require("../functions/getChannelIdFromString");
function getTextChannelFilter(embedMessage) {
    const { message } = embedMessage;
    return (target) => {
        const channel = fetchGuildChannel_1.fetchGuildChannel(message.guild, getChannelIdFromString_1.getChannelIdFromString(target.content));
        return Boolean(channel) && channel?.type === "text";
    };
}
exports.getTextChannelFilter = getTextChannelFilter;
//# sourceMappingURL=textChannel.js.map