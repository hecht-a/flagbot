"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectReaction = void 0;
async function collectReaction(message, filter, options = { max: 1 }) {
    const collected = await message.awaitReactions(filter, options);
    const reaction = collected.first();
    if (!reaction) {
        return;
    }
    if (reaction.partial) {
        await reaction.fetch();
    }
    if (reaction.message.partial) {
        await reaction.message.fetch();
    }
    return reaction;
}
exports.collectReaction = collectReaction;
//# sourceMappingURL=collectReaction.js.map