"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editValue = void 0;
const changePage_1 = require("./changePage");
const pushValueInDB_1 = require("../../../functions/pushValueInDB");
const sendError_1 = require("../../../functions/sendError");
async function editValue(source, filter, column, transformation) {
    const collectorFilter = (message) => message.channel === source.message.channel
        && message.author === source.author
        && !message.author.bot;
    await source.message.reactions.removeAll();
    await source.message.edit("You have 30 seconds to input the value you want. Type `$cancel` to cancel.");
    await source.message.suppressEmbeds();
    const collected = await source.message.channel.awaitMessages(collectorFilter, { max: 1, time: 30000 });
    const message = collected.first();
    if (!message || message.content === "$cancel") {
        return changePage_1.changePage(source);
    }
    if (!filter(message)) {
        (await message.channel.send("Provided value is not valid (maybe it's too long or not the right type?).")).delete({
            timeout: 5000,
        });
        return changePage_1.changePage(source);
    }
    try {
        await pushValueInDB_1.pushValueInDB("servers", { [column]: transformation?.(message.content) || message.content }, { server_id: message.guild?.id });
    }
    catch (error) {
        await sendError_1.sendError(source.message, error);
    }
    try {
        await message.delete();
    }
    catch { }
    await changePage_1.changePage(source);
}
exports.editValue = editValue;
//# sourceMappingURL=editValue.js.map