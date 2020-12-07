"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const Client_1 = require("./classes/Client");
const client = new Client_1.Client({
    partials: ["USER", "GUILD_MEMBER", "MESSAGE", "REACTION"],
    ws: {
        intents: [
            "GUILDS", "GUILD_PRESENCES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_EMOJIS",
        ],
    },
});
exports.client = client;
client.init();
//# sourceMappingURL=index.js.map