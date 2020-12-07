"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringNormalize = void 0;
function stringNormalize(baseString) {
    const firstLetter = baseString.charAt(0).toUpperCase();
    const base = baseString.slice(1).toLowerCase();
    return firstLetter + base;
}
exports.stringNormalize = stringNormalize;
//# sourceMappingURL=stringNormalize.js.map