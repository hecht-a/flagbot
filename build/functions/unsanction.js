"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsanction = void 0;
const discord_js_1 = require("discord.js");
const database_1 = require("../lib/database");
const constants_1 = require("../lib/constants");
const log_1 = require("./log");
const verifUserInDB_1 = require("./verifUserInDB");
const getMuteRole_1 = require("./getMuteRole");
const longTimeout_1 = require("./longTimeout");
const fetchMember_1 = require("./fetchMember");
async function unsanction(id, server, sanction, forced = false) {
    await verifUserInDB_1.verifUserInDB(id, server);
    const user = (await database_1.db.from("users").where({ server_id: server.id, discord_id: id, actual_sanction: sanction }))[0];
    if (!user) {
        return;
    }
    const { expiration } = user;
    const now = Date.now();
    if (expiration && now < expiration && !forced) {
        return longTimeout_1.longTimeout(() => {
            unsanction(id, server, sanction);
        }, expiration - now);
    }
    const baseEmbed = new discord_js_1.MessageEmbed()
        .setAuthor("Moderation", server.iconURL({ dynamic: true }))
        .setColor(constants_1.COLORS.lightGreen)
        .setTimestamp();
    const autoEmbed = new discord_js_1.MessageEmbed(baseEmbed)
        .setColor(constants_1.COLORS.gold)
        .setDescription(`[AUTO] ${user.pseudo} has been un${sanction} (sanction timeout).`);
    if (sanction === "muted") {
        const member = await fetchMember_1.fetchMember(server, id);
        const muteRole = await getMuteRole_1.getMuteRole(server);
        if (member && muteRole && member.roles.cache.get(muteRole.id)) {
            await member.roles.remove(muteRole);
        }
        await database_1.db
            .update({
            actual_sanction: null,
            created: null,
            expiration: null,
        })
            .into("users")
            .where({ server_id: server.id, discord_id: id });
        const unmuteEmbed = new discord_js_1.MessageEmbed(baseEmbed)
            .setTitle("Unmute")
            .setDescription(`You have been unmuted from ${server.name}.`);
        await user.send(unmuteEmbed);
        if (!forced) {
            await log_1.log("mod_log", autoEmbed, server);
        }
        return;
    }
    // else
    const bans = await server.fetchBans();
    if (!bans.get(id)) {
        return;
    }
    await server.members.unban(id, "[AUTO] Sanction finished.");
    await database_1.db
        .update({
        actual_sanction: null,
        created: null,
        expiration: null,
    })
        .into("users")
        .where({ server_id: server.id, discord_id: id });
    if (!forced) {
        await log_1.log("mod_log", autoEmbed, server);
    }
}
exports.unsanction = unsanction;
//# sourceMappingURL=unsanction.js.map