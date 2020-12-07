"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrefixReactionsEffects = void 0;
const changePage_1 = require("../../functions/changePage");
const editValue_1 = require("../../functions/editValue");
const index_1 = require("../../index");
function getPrefixReactionsEffects(embedMessage) {
    const { message, author } = embedMessage;
    const editFilter = (target) => target.content.length <= 5
        && !target.content.match(/\s+/);
    return ({
        "✏": async () => editValue_1.editValue(embedMessage, editFilter, "prefix"),
        "🚪": async () => changePage_1.changePage(index_1.getMainEmbedMessage(message, author)),
    });
}
exports.getPrefixReactionsEffects = getPrefixReactionsEffects;
//# sourceMappingURL=reactions.js.map