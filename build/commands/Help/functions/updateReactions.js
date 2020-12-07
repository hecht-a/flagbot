"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReactions = void 0;
const react_1 = require("../../../functions/react");
async function updateReactions(message, embeds, page) {
    if (embeds.length <= 0) {
        return;
    }
    if (page === 0) {
        await react_1.react("➡⏭", message);
    }
    else if (page === embeds.length - 1) {
        await react_1.react("⏮⬅", message);
    }
    else {
        await react_1.react("⏮⬅➡⏭", message);
    }
    await react_1.react("❌", message);
}
exports.updateReactions = updateReactions;
//# sourceMappingURL=updateReactions.js.map