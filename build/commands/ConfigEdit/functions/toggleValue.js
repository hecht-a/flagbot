"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleValue = void 0;
const getValueFromDB_1 = require("../../../functions/getValueFromDB");
const pushValueInDB_1 = require("../../../functions/pushValueInDB");
const reactionsHandler_1 = require("./reactionsHandler");
async function toggleValue(source, column) {
    const { message, embed } = source;
    const value = await getValueFromDB_1.getValueFromDB("servers", column, { server_id: message.guild?.id });
    await pushValueInDB_1.pushValueInDB("servers", { [column]: !value }, { server_id: message.guild?.id });
    await message.edit("", await embed(message));
    await reactionsHandler_1.reactionsHandler(source);
}
exports.toggleValue = toggleValue;
//# sourceMappingURL=toggleValue.js.map