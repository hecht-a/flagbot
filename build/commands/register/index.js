"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../classes/Command");
const pushValueInDB_1 = require("../../functions/pushValueInDB");
const getValueFromDB_1 = require("../../functions/getValueFromDB");
class Register extends Command_1.Command {
    constructor(client) {
        super({
            name: "register",
            description: "Set your Lichess username in the bot",
            category: "Lichess",
        }, client);
    }
    async run(message, args) {
        if (!this.client.operational || message.author.bot || !message.guild) {
            return;
        }
        const username = await getValueFromDB_1.getValueFromDB("lichess", "lichess_username", { discord_id: message.member?.user.id });
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        username
            ? await pushValueInDB_1.pushValueInDB("lichess", { lichess_username: args[0] }, { discord_id: message.member?.user.id })
            : await pushValueInDB_1.pushValueInDB("lichess", {
                discord_id: message.member?.user.id,
                lichess_username: args[0],
            });
        message.channel.send("Registered");
    }
}
exports.default = Register;
//# sourceMappingURL=index.js.map