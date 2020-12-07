"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../classes/Command");
const getValueFromDB_1 = require("../../functions/getValueFromDB");
const pushValueInDB_1 = require("../../functions/pushValueInDB");
class Prefix extends Command_1.Command {
    constructor(client) {
        super({
            name: "prefix",
            description: "Change bot's prefix",
            category: "Mod",
        }, client);
    }
    async run(message, args) {
        if (!this.client.operational || message.author.bot || !message.guild) {
            return;
        }
        const lastPrefix = await getValueFromDB_1.getValueFromDB("servers", "prefix", { server_id: message.guild.id });
        pushValueInDB_1.pushValueInDB("servers", "prefix", message.guild.id, args[0]);
        console.log(lastPrefix, args[0]);
    }
}
exports.default = Prefix;
//# sourceMappingURL=index.js.map