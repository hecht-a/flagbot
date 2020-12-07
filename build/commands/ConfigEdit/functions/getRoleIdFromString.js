"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleIdFromString = void 0;
function getRoleIdFromString(input) {
    const mentionTemplate = input.match(/^<@&(?<role>\d+)>$|^(?<id>\d+)$/);
    return mentionTemplate?.groups?.role || mentionTemplate?.groups?.id;
}
exports.getRoleIdFromString = getRoleIdFromString;
//# sourceMappingURL=getRoleIdFromString.js.map