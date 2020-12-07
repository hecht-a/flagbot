"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifUserInDB = void 0;
const index_1 = require("../index");
const database_1 = require("../lib/database");
async function verifUserInDB(userID, server) {
    const user = await index_1.client.users.fetch(userID);
    const userInDB = await database_1.db.from("users").where({ server_id: server.id, discord_id: userID });
    if (!userInDB[0]) {
        await database_1.db
            .insert({
            server_id: server.id,
            discord_id: userID,
            pseudo: user.tag,
        })
            .into("users");
    }
}
exports.verifUserInDB = verifUserInDB;
//# sourceMappingURL=verifUserInDB.js.map