"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGuildChannel = void 0;
function fetchGuildChannel(guild, id) {
    try {
        return guild.channels.cache.get(id);
    }
    catch { }
}
exports.fetchGuildChannel = fetchGuildChannel;
//# sourceMappingURL=fetchGuildChannel.js.map