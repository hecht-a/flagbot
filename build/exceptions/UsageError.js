"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageError = void 0;
const CommandError_1 = require("./CommandError");
class UsageError extends CommandError_1.CommandError {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.UsageError = UsageError;
//# sourceMappingURL=UsageError.js.map