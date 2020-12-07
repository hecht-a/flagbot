"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = void 0;
class UserError extends Error {
    constructor(message = "User not found.") {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.UserError = UserError;
//# sourceMappingURL=UserError.js.map