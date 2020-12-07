"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordError = void 0;
class DiscordError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.DiscordError = DiscordError;
//# sourceMappingURL=DiscordError.js.map