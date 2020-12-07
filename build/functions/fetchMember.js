"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMember = void 0;
async function fetchMember(guild, user) {
    try {
        return await guild.members.fetch(user || "1");
    }
    catch { }
}
exports.fetchMember = fetchMember;
//# sourceMappingURL=fetchMember.js.map