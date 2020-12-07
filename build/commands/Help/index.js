"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../classes/Command");
const getValueFromDB_1 = require("../../functions/getValueFromDB");
const globalHelp_1 = require("./pages/globalHelp");
const commandHelp_1 = require("./pages/commandHelp");
class Help extends Command_1.Command {
    constructor(client) {
        super({
            name: "help",
            description: "Get commands help",
            category: "Utility",
            usage: (prefix) => `${prefix}help [command|page number]`,
        }, client);
    }
    async run(message, args) {
        const prefix = await getValueFromDB_1.getValueFromDB("servers", "prefix", { server_id: message.guild?.id });
        const pageNumber = Number(args[0]);
        return !args[0] || Number.isInteger(pageNumber)
            ? globalHelp_1.globalHelp(message, pageNumber, this.client, prefix)
            : commandHelp_1.commandHelp(message, args, this.client, prefix);
    }
}
exports.default = Help;
//# sourceMappingURL=index.js.map