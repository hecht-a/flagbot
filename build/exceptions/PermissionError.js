"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionError = void 0;
const CommandError_1 = require("./CommandError");
class PermissionError extends CommandError_1.CommandError {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.PermissionError = PermissionError;
//# sourceMappingURL=PermissionError.js.map