"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushValueInDB = void 0;
const database_1 = require("../lib/database");
// eslint-disable-next-line max-len
async function pushValueInDB(table, update, where) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    where
        ? await database_1.db
            .update(update)
            .into(table)
            .where(where)
        : await database_1.db.insert(update).into(table);
}
exports.pushValueInDB = pushValueInDB;
//# sourceMappingURL=pushValueInDB.js.map