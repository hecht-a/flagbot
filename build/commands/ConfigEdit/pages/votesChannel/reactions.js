"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVotesChannelReactionsEffects = void 0;
const changePage_1 = require("../../functions/changePage");
const editValue_1 = require("../../functions/editValue");
const index_1 = require("../../index");
const getChannelIdFromString_1 = require("../../functions/getChannelIdFromString");
const textChannel_1 = require("../../filters/textChannel");
function getVotesChannelReactionsEffects(embedMessage) {
    const { message, author } = embedMessage;
    return ({
        "✏": async () => editValue_1.editValue(embedMessage, textChannel_1.getTextChannelFilter(embedMessage), "votes_channel", getChannelIdFromString_1.getChannelIdFromString),
        "🚪": async () => changePage_1.changePage(index_1.getMainEmbedMessage(message, author)),
    });
}
exports.getVotesChannelReactionsEffects = getVotesChannelReactionsEffects;
//# sourceMappingURL=reactions.js.map