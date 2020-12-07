"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.longTimeout = void 0;
function longTimeout(handler, timeout) {
    const MAX_TIMEOUT_TIME = 2147483647;
    if (timeout > MAX_TIMEOUT_TIME) {
        const newTimeout = timeout - MAX_TIMEOUT_TIME;
        return setTimeout(() => {
            longTimeout(handler, newTimeout);
        }, MAX_TIMEOUT_TIME);
    }
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return setTimeout(handler, timeout);
}
exports.longTimeout = longTimeout;
//# sourceMappingURL=longTimeout.js.map