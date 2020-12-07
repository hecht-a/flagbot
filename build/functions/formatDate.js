"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
function formatDate(dateToFormat) {
    const date = dateToFormat && new Date(dateToFormat).toString() !== "Invalid Date"
        ? new Date(dateToFormat)
        : new Date();
    const dateOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };
    return date.toLocaleDateString(undefined, dateOptions);
}
exports.formatDate = formatDate;
//# sourceMappingURL=formatDate.js.map