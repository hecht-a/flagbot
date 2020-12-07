"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainEmbedMessage = void 0;
const Command_1 = require("../../classes/Command");
const embed_1 = require("./pages/main/embed");
const react_1 = require("../../functions/react");
const reactionsHandler_1 = require("./functions/reactionsHandler");
const reactions_1 = require("./pages/main/reactions");
function getMainEmbedMessage(message, author) {
    return ({
        message,
        author,
        embed: embed_1.getMainEmbed,
        reactions: "❗📝📑📃🔨⚒📥📜🖊️⚜️💠📤📄🖋️🤐💻✅",
        reactionsEffects: () => reactions_1.getMainReactionsEffects(message, author),
    });
}
exports.getMainEmbedMessage = getMainEmbedMessage;
class ConfigEdit extends Command_1.Command {
    constructor(client) {
        super({
            name: "configedit",
            description: "Edit configuration",
            category: "Administration",
            aliases: ["editconfig"],
            permission: "ADMINISTRATOR",
        }, client);
    }
    async run(message, args) {
        const mainEmbed = embed_1.getMainEmbed(message);
        const embedMessage = await message.channel.send(mainEmbed);
        const mainEmbedMessage = getMainEmbedMessage(embedMessage, message.author);
        const { reactions } = mainEmbedMessage;
        await react_1.react(reactions, embedMessage);
        await reactionsHandler_1.reactionsHandler(mainEmbedMessage);
    }
}
exports.default = ConfigEdit;
//# sourceMappingURL=index.js.map