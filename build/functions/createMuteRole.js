"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMuteRole = void 0;
const index_1 = require("../index");
const pushValueInDB_1 = require("./pushValueInDB");
async function createMuteRole(server) {
    const botRole = server.member(index_1.client.user)?.roles.highest;
    const botHighestRolePosition = botRole?.position;
    const muteRole = await server.roles.create({
        data: {
            name: "Muted",
            color: 0x000001,
            hoist: false,
            position: botHighestRolePosition,
            permissions: ["VIEW_CHANNEL", "CONNECT", "READ_MESSAGE_HISTORY"],
            mentionable: false,
        },
        reason: "[AUTO] Mute role not found, created",
    });
    await pushValueInDB_1.pushValueInDB("servers", { mute_role_id: muteRole.id }, { server_id: server.id });
    return muteRole;
}
exports.createMuteRole = createMuteRole;
//# sourceMappingURL=createMuteRole.js.map