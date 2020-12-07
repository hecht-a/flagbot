"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRole = void 0;
function fetchRole(guild, id) {
    try {
        return guild.roles.cache.get(id);
    }
    catch { }
}
exports.fetchRole = fetchRole;
//# sourceMappingURL=fetchRole.js.map