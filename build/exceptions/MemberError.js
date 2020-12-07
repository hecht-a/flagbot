"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberError = void 0;
class MemberError extends Error {
    constructor(message = "Member not found.") {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.MemberError = MemberError;
//# sourceMappingURL=MemberError.js.map