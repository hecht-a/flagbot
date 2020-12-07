"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogsChannelReactionsEffects = void 0;
const changePage_1 = require("../../functions/changePage");
const editValue_1 = require("../../functions/editValue");
const index_1 = require("../../index");
const getChannelIdFromString_1 = require("../../functions/getChannelIdFromString");
const textChannel_1 = require("../../filters/textChannel");
function getLogsChannelReactionsEffects(embedMessage) {
    const { message, author } = embedMessage;
    return ({
        "✏": async () => editValue_1.editValue(embedMessage, textChannel_1.getTextChannelFilter(embedMessage), "logs_channel", getChannelIdFromString_1.getChannelIdFromString),
        "🚪": async () => changePage_1.changePage(index_1.getMainEmbedMessage(message, author)),
    });
}
exports.getLogsChannelReactionsEffects = getLogsChannelReactionsEffects;
//# sourceMappingURL=reactions.js.map