"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePage = void 0;
const react_1 = require("../../../functions/react");
const reactionsHandler_1 = require("./reactionsHandler");
async function changePage(target) {
    const { message, embed, reactions, } = target;
    await message.edit("", await embed(message));
    await message.reactions.removeAll();
    await react_1.react(reactions, message);
    await reactionsHandler_1.reactionsHandler(target);
}
exports.changePage = changePage;
//# sourceMappingURL=changePage.js.map