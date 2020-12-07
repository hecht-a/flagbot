"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMuteRoleReactionsEffects = void 0;
const changePage_1 = require("../../functions/changePage");
const editValue_1 = require("../../functions/editValue");
const index_1 = require("../../index");
const role_1 = require("../../filters/role");
function getMuteRoleReactionsEffects(embedMessage) {
    const { message, author } = embedMessage;
    return ({
        "✏": async () => editValue_1.editValue(embedMessage, role_1.getRoleFilter(embedMessage), "mute_role_id"),
        "🚪": async () => changePage_1.changePage(index_1.getMainEmbedMessage(message, author)),
    });
}
exports.getMuteRoleReactionsEffects = getMuteRoleReactionsEffects;
//# sourceMappingURL=reactions.js.map