"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleFilter = void 0;
const getRoleIdFromString_1 = require("../functions/getRoleIdFromString");
const fetchRole_1 = require("../functions/fetchRole");
function getRoleFilter(embedMessage) {
    const { message } = embedMessage;
    return (target) => Boolean(fetchRole_1.fetchRole(message.guild, getRoleIdFromString_1.getRoleIdFromString(target.content)));
}
exports.getRoleFilter = getRoleFilter;
//# sourceMappingURL=role.js.map