"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.react = void 0;
async function react(emojis, message) {
    for (const emoji of emojis) {
        try {
            await message.react(emoji);
        }
        catch { }
    }
}
exports.react = react;
//# sourceMappingURL=react.js.map