"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionsHandler = void 0;
const emojis_1 = require("../filters/emojis");
const collectReaction_1 = require("../../../functions/collectReaction");
async function reactionsHandler(embedMessage) {
    const { message, reactionsEffects, author } = embedMessage;
    const effects = reactionsEffects.bind(embedMessage)();
    const emojiFilter = emojis_1.getEmojiFilter(embedMessage);
    const reaction = await collectReaction_1.collectReaction(message, emojiFilter);
    if (!reaction) {
        return;
    }
    if (!effects[reaction.emoji.name]) {
        return;
    }
    await reaction.users.remove(author);
    effects[reaction.emoji.name]();
}
exports.reactionsHandler = reactionsHandler;
//# sourceMappingURL=reactionsHandler.js.map