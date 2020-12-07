"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandError = void 0;
class CommandError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.CommandError = CommandError;
//# sourceMappingURL=CommandError.js.map