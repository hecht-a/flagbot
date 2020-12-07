"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeavingMessageActiveReactionsEffects = void 0;
const index_1 = require("../../index");
const changePage_1 = require("../../functions/changePage");
const toggleValue_1 = require("../../functions/toggleValue");
function getLeavingMessageActiveReactionsEffects(embedMessage) {
    const { message, author } = embedMessage;
    return ({
        "🔄": async () => toggleValue_1.toggleValue(embedMessage, "leaving_message_active"),
        "🚪": async () => changePage_1.changePage(index_1.getMainEmbedMessage(message, author)),
    });
}
exports.getLeavingMessageActiveReactionsEffects = getLeavingMessageActiveReactionsEffects;
//# sourceMappingURL=reactions.js.map