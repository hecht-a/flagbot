"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueFromDB = void 0;
const database_1 = require("../lib/database");
async function getValueFromDB(table, column, where) {
    const result = where
        ? await database_1.db.select(column).from(table).where(where)
        : await database_1.db.select(column).from(table);
    return result[0]?.[column];
}
exports.getValueFromDB = getValueFromDB;
//# sourceMappingURL=getValueFromDB.js.map