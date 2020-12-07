"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModLogsActiveReactionsEffects = void 0;
const index_1 = require("../../index");
const changePage_1 = require("../../functions/changePage");
const toggleValue_1 = require("../../functions/toggleValue");
function getModLogsActiveReactionsEffects(embedMessage) {
    const { message, author } = embedMessage;
    return ({
        "🔄": async () => toggleValue_1.toggleValue(embedMessage, "mod_logs_active"),
        "🚪": async () => changePage_1.changePage(index_1.getMainEmbedMessage(message, author)),
    });
}
exports.getModLogsActiveReactionsEffects = getModLogsActiveReactionsEffects;
//# sourceMappingURL=reactions.js.map