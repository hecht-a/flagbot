"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMuteRole = void 0;
const getValueFromDB_1 = require("./getValueFromDB");
const createMuteRole_1 = require("./createMuteRole");
const configMuteRole_1 = require("./configMuteRole");
async function getMuteRole(server) {
    const muteRoleDB = await server.roles.fetch((await getValueFromDB_1.getValueFromDB("servers", "mute_role_id", { server_id: server.id })) || "1");
    const muteRole = muteRoleDB || (await createMuteRole_1.createMuteRole(server));
    await configMuteRole_1.configMuteRole(server, muteRole);
    return muteRole;
}
exports.getMuteRole = getMuteRole;
//# sourceMappingURL=getMuteRole.js.map