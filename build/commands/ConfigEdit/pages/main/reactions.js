"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainReactionsEffects = void 0;
const changePage_1 = require("../../functions/changePage");
const embed_1 = require("../prefix/embed");
const embed_2 = require("../votesChannel/embed");
const reactions_1 = require("../prefix/reactions");
const reactions_2 = require("../votesChannel/reactions");
const embed_3 = require("../logsActive/embed");
const reactions_3 = require("../logsActive/reactions");
const embed_4 = require("../logsChannel/embed");
const reactions_4 = require("../logsChannel/reactions");
const embed_5 = require("../modLogsActive/embed");
const reactions_5 = require("../modLogsActive/reactions");
const embed_6 = require("../modLogsChannel/embed");
const embed_7 = require("../joiningMessageActive/embed");
const reactions_6 = require("../joiningMessageActive/reactions");
const embed_8 = require("../joiningMessageChannel/embed");
const reactions_7 = require("../joiningMessageChannel/reactions");
const embed_9 = require("../joiningMessage/embed");
const reactions_8 = require("../joiningMessage/reactions");
const reactions_9 = require("../modLogsChannel/reactions");
const embed_10 = require("../joiningRoleActive/embed");
const reactions_10 = require("../joiningRoleActive/reactions");
const embed_11 = require("../joiningRole/embed");
const reactions_11 = require("../joiningRole/reactions");
const embed_12 = require("../leavingMessageActive/embed");
const reactions_12 = require("../leavingMessageActive/reactions");
const embed_13 = require("../leavingMessageChannel/embed");
const reactions_13 = require("../leavingMessageChannel/reactions");
const embed_14 = require("../leavingMessage/embed");
const reactions_14 = require("../leavingMessage/reactions");
const embed_15 = require("../muteRole/embed");
const reactions_15 = require("../muteRole/reactions");
const embed_16 = require("../commandsChannel/embed");
const reactions_16 = require("../commandsChannel/reactions");
function getMainReactionsEffects(message, author) {
    return ({
        "❗": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_1.getPrefixEmbed,
            reactions: "✏🚪",
            reactionsEffects() {
                return reactions_1.getPrefixReactionsEffects(this);
            },
        }),
        "📝": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_2.getVotesChannelEmbed,
            reactions: "✏🚪",
            reactionsEffects() {
                return reactions_2.getVotesChannelReactionsEffects(this);
            },
        }),
        "📑": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_3.getLogsActiveEmbed,
            reactions: "🔄🚪",
            reactionsEffects() {
                return reactions_3.getLogsActiveReactionsEffects(this);
            },
        }),
        "📃": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_4.getLogsChannelEmbed,
            reactions: "✏🚪",
            reactionsEffects() {
                return reactions_4.getLogsChannelReactionsEffects(this);
            },
        }),
        "🔨": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_5.getModLogsActiveEmbed,
            reactions: "🔄🚪",
            reactionsEffects() {
                return reactions_5.getModLogsActiveReactionsEffects(this);
            },
        }),
        "⚒": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_6.getModLogsChannelEmbed,
            reactions: "✏🚪",
            reactionsEffects() {
                return reactions_9.getModLogsChannelReactionsEffects(this);
            },
        }),
        "📥": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_7.getJoiningMessageActiveEmbed,
            reactions: "🔄🚪",
            reactionsEffects() {
                return reactions_6.getJoiningMessageActiveReactionsEffects(this);
            },
        }),
        "📜": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_8.getJoiningMessageChannelEmbed,
            reactions: "✏🚪",
            reactionsEffects() {
                return reactions_7.getJoiningMessageChannelReactionsEffects(this);
            },
        }),
        "🖊️": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_9.getJoiningMessageEmbed,
            reactions: "✏🚪",
            reactionsEffects() {
                return reactions_8.getJoiningMessageReactionsEffects(this);
            },
        }),
        "⚜️": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_10.getJoiningRoleActiveEmbed,
            reactions: "🔄🚪",
            reactionsEffects() {
                return reactions_10.getJoiningRoleActiveReactionsEffects(this);
            },
        }),
        "💠": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_11.getJoiningRoleEmbed,
            reactions: "✏🚪",
            reactionsEffects() {
                return reactions_11.getJoiningRoleReactionsEffects(this);
            },
        }),
        "📤": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_12.getLeavingMessageActiveEmbed,
            reactions: "🔄🚪",
            reactionsEffects() {
                return reactions_12.getLeavingMessageActiveReactionsEffects(this);
            },
        }),
        "📄": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_13.getLeavingMessageChannelEmbed,
            reactions: "✏🚪",
            reactionsEffects() {
                return reactions_13.getLeavingMessageChannelReactionsEffects(this);
            },
        }),
        "🖋️": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_14.getLeavingMessageEmbed,
            reactions: "✏🚪",
            reactionsEffects() {
                return reactions_14.getLeavingMessageReactionsEffects(this);
            },
        }),
        "🤐": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_15.getMuteRoleEmbed,
            reactions: "✏🚪",
            reactionsEffects() {
                return reactions_15.getMuteRoleReactionsEffects(this);
            },
        }),
        "💻": async () => changePage_1.changePage({
            message,
            author,
            embed: embed_16.getCommandsChannelEmbed,
            reactions: "✏🚪",
            reactionsEffects() {
                return reactions_16.getCommandsChannelReactionsEffects(this);
            },
        }),
        "✅": async () => {
            try {
                await message.delete();
            }
            catch { }
        },
    });
}
exports.getMainReactionsEffects = getMainReactionsEffects;
//# sourceMappingURL=reactions.js.map