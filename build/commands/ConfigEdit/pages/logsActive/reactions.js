"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogsActiveReactionsEffects = void 0;
const index_1 = require("../../index");
const changePage_1 = require("../../functions/changePage");
const toggleValue_1 = require("../../functions/toggleValue");
function getLogsActiveReactionsEffects(embedMessage) {
    const { message, author } = embedMessage;
    return ({
        "🔄": async () => toggleValue_1.toggleValue(embedMessage, "logs_active"),
        "🚪": async () => changePage_1.changePage(index_1.getMainEmbedMessage(message, author)),
    });
}
exports.getLogsActiveReactionsEffects = getLogsActiveReactionsEffects;
//# sourceMappingURL=reactions.js.map