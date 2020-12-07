"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.DatabaseError = DatabaseError;
//# sourceMappingURL=DatabaseError.js.map