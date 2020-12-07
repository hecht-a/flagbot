"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../classes/Command");
const DiscordError_1 = require("../../exceptions/DiscordError");
class Ping extends Command_1.Command {
    constructor(client) {
        super({
            name: "ping",
            description: "Check bot's ping",
            category: "Misc",
        }, client);
    }
    async run(message, args) {
        const messageCreatedAt = message.createdTimestamp;
        const reply = await message.channel.send("Ping?");
        const replyCreatedAt = reply.createdTimestamp;
        const ping = Number((replyCreatedAt - messageCreatedAt).toFixed(2));
        try {
            await reply.edit(`🎉 Pong! Took ${ping} ms.`);
        }
        catch (error) {
            throw new DiscordError_1.DiscordError(`Message cannot be edited; ${error.message}`);
        }
    }
}
exports.default = Ping;
//# sourceMappingURL=index.js.map