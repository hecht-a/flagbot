"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJoiningMessageReactionsEffects = void 0;
const changePage_1 = require("../../functions/changePage");
const editValue_1 = require("../../functions/editValue");
const index_1 = require("../../index");
function getJoiningMessageReactionsEffects(embedMessage) {
    const { message, author } = embedMessage;
    const editFilter = (target) => target.content.length <= 200;
    return ({
        "✏": async () => editValue_1.editValue(embedMessage, editFilter, "joining_message_text"),
        "🚪": async () => changePage_1.changePage(index_1.getMainEmbedMessage(message, author)),
    });
}
exports.getJoiningMessageReactionsEffects = getJoiningMessageReactionsEffects;
//# sourceMappingURL=reactions.js.map