"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalHelp = void 0;
const discord_js_1 = require("discord.js");
const config = require("../../../config.json");
const constants_1 = require("../../../lib/constants");
const updateReactions_1 = require("../functions/updateReactions");
const collectReaction_1 = require("../../../functions/collectReaction");
async function globalHelp(message, pageNumber, client, prefix) {
    const commands = [];
    const stockEmbeds = [];
    let embed = new discord_js_1.MessageEmbed()
        .setColor(constants_1.COLORS.lightGreen)
        .setThumbnail(client.user?.displayAvatarURL({ dynamic: true }))
        .setFooter(`Asked by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
    for (const [, command] of client.commands) {
        const { category, name, permission } = command.informations;
        const commandData = { category, name };
        if (permission === "BOT_OWNER") {
            if (message.author.id === config.botOwner) {
                commands.push(commandData);
            }
            continue;
        }
        if (permission) {
            if (message.member?.hasPermission(permission)) {
                commands.push(commandData);
            }
            continue;
        }
        commands.push(commandData);
    }
    if (!commands[0]) {
        embed.setTitle("No command found.");
        await message.channel.send(embed);
        return;
    }
    commands.sort((a, b) => {
        const categoryA = a.category;
        const categoryB = b.category;
        if (categoryA < categoryB) {
            return -1;
        }
        if (categoryA > categoryB) {
            return 1;
        }
        return 0;
    });
    embed.setTitle(commands[0].category);
    const getCommandByIndex = (index) => client.commands.get(commands[index].name);
    embed.addField(`**${prefix}${commands[0].name}**`, getCommandByIndex(0).informations.description);
    for (let i = 1; i < commands.length; i++) {
        if (commands[i].category !== commands[i - 1].category) {
            stockEmbeds.push(embed);
            embed = new discord_js_1.MessageEmbed()
                .setColor(constants_1.COLORS.lightGreen)
                .setThumbnail(client.user?.displayAvatarURL({ dynamic: true }))
                .setFooter(`Asked by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
            embed.setTitle(commands[i].category);
        }
        embed.addField(`**${prefix}${commands[i].name}**`, getCommandByIndex(i).informations.description);
    }
    stockEmbeds.push(embed);
    for (const [index, page] of stockEmbeds.entries()) {
        page.setAuthor(`Commands available - Page ${index + 1} on ${stockEmbeds.length}`);
    }
    const page = pageNumber > 0
        ? pageNumber - 1
        : 0;
    let currentPage = page > stockEmbeds.length - 1
        ? stockEmbeds.length - 1
        : page;
    const embedMessage = await message.channel.send(stockEmbeds[currentPage]);
    await updateReactions_1.updateReactions(embedMessage, stockEmbeds, currentPage);
    const filter = (reaction, user) => reaction.message.id === embedMessage.id
        && user === message.author
        && !user.bot
        && ["⏮️", "⬅", "➡", "⏭", "❌"].includes(reaction.emoji.name);
    const reactions = {
        "⏮": () => (currentPage = 0),
        "⬅": () => currentPage--,
        "➡": () => currentPage++,
        "⏭": () => (currentPage = stockEmbeds.length - 1),
        "❌": () => void embedMessage.delete(),
    };
    while (embedMessage && !embedMessage.deleted) {
        const reaction = await collectReaction_1.collectReaction(embedMessage, filter);
        if (!reaction) {
            return;
        }
        if (!reactions[reaction.emoji.name]) {
            continue;
        }
        reactions[reaction.emoji.name]();
        if (reaction.emoji.name === "❌") {
            break;
        }
        await embedMessage.reactions.removeAll();
        await embedMessage.edit(stockEmbeds[currentPage]);
        await updateReactions_1.updateReactions(embedMessage, stockEmbeds, currentPage);
    }
}
exports.globalHelp = globalHelp;
//# sourceMappingURL=globalHelp.js.map