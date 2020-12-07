"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmojiFilter = void 0;
function getEmojiFilter(embedMessage) {
    const { message, author } = embedMessage;
    return (reaction, user) => reaction.message.id === message.id
        && user === author
        && !user.bot
        && embedMessage.reactions.indexOf(reaction.emoji.name) >= 0;
}
exports.getEmojiFilter = getEmojiFilter;
//# sourceMappingURL=emojis.js.map