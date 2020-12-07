"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Command_1 = require("../../classes/Command");
const getValueFromDB_1 = require("../../functions/getValueFromDB");
const embed_1 = require("./functions/embed");
class PlayerInfo extends Command_1.Command {
    constructor(client) {
        super({
            name: "playerinfo",
            description: "Set your Lichess username in the bot",
            category: "Lichess",
            aliases: ["plinfos", "playerinfos", "plinfo", "plstats"],
        }, client);
    }
    async run(message, args) {
        if (!this.client.operational || message.author.bot || !message.guild) {
            return;
        }
        // eslint-disable-next-line max-len
        const username = await getValueFromDB_1.getValueFromDB("lichess", "lichess_username", { discord_id: message.member?.id });
        const getUser = username || args[0];
        const { data } = await axios_1.default.get(`https://lichess.org/api/user/${getUser}`);
        message.channel.send(embed_1.getPlayerEmbed(message, data));
    }
}
exports.default = PlayerInfo;
//# sourceMappingURL=index.js.map