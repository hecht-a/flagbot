"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const axios_1 = require("axios");
const Command_1 = require("../../classes/Command");
// import { getValueFromDB } from "../../functions/getValueFromDB";
class Flag extends Command_1.Command {
    constructor(client) {
        super({
            name: "flag",
            description: "Check bot's ping",
            category: "Game",
        }, client);
    }
    async run(message, args) {
        if (!this.client.operational || message.author.bot || !message.guild) {
            return;
        }
        // const language = await getValueFromDB<string>("servers", "language", { server_id: message.guild.id });
        const countries = (await axios_1.default.get(`https://flagcdn.com/en/codes.json`)).data;
        const n = Math.floor(Math.random() * Object.keys(countries).length);
        console.log(countries[Object.keys(countries)[n]]);
        const embed = new discord_js_1.MessageEmbed()
            .setImage("https://flagcdn.com/48x36/za.png");
        message.channel.send(embed);
    }
}
exports.default = Flag;
//# sourceMappingURL=index.js.map