"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannelIdFromString = void 0;
function getChannelIdFromString(input) {
    const mentionTemplate = input.match(/^<#(?<channel>\d+)>$|^(?<id>\d+)$/);
    return mentionTemplate?.groups?.channel || mentionTemplate?.groups?.id;
}
exports.getChannelIdFromString = getChannelIdFromString;
//# sourceMappingURL=getChannelIdFromString.js.map