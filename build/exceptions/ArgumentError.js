"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentError = void 0;
const UsageError_1 = require("./UsageError");
class ArgumentError extends UsageError_1.UsageError {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.ArgumentError = ArgumentError;
//# sourceMappingURL=ArgumentError.js.map