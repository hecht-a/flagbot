/* eslint-disable max-len */
import {
	Message, MessageEmbed, PermissionResolvable, TextChannel,
} from "discord.js";
import { Event } from "../../classes/Event";
import { getValueFromDB } from "../../functions/getValueFromDB";
import * as config from "../../config.json";
import { sendError } from "../../functions/sendError";
import { Client } from "../../classes/Client";
import { formatDate } from "../../functions/formatDate";

export default class Command extends Event {
	constructor(client: Client) {
		super("message", client);
	}

	async listener(message: Message): Promise<void> {
		if (!this.client.operational || message.author.bot || !message.guild) {
			return;
		}

		if (message.author.partial) {
			await message.author.fetch();
		}

		if (message.member?.partial) {
			await message.member.fetch();
		}

		const prefix = await getValueFromDB<string>("servers", "prefix", { server_id: message.guild.id });

		// eslint-disable-next-line max-len
		const pattern = /https?:\/\/(?<subdomain>canary.|ptb.)?discord(app)?.com\/channels\/(?<guild>\d+)\/(?<channel>\d+)\/(?<message>\d+)/gmi;

		if (message.content.match(pattern) !== null) {
			const executed = pattern.exec(message.content);
			const groups = executed?.groups;
			if (groups) {
				const fetchedGuild = this.client.guilds.fetch(groups.guild);
				const fetchedChannel = (await fetchedGuild).channels.cache.get(groups.channel) as TextChannel;
				const fetchedMessage = fetchedChannel?.messages.fetch(groups.message);
				const embed = new MessageEmbed()
					.setFooter(`Quoted by ${message.author.tag} | in #${(fetchedChannel).name} at ${(await fetchedGuild).name} • ${formatDate((await fetchedMessage).createdTimestamp)}`)
					.setAuthor((await fetchedMessage).author.tag, (await fetchedMessage).author.displayAvatarURL())
					.setThumbnail((await fetchedMessage).author.displayAvatarURL());

				if ((await fetchedMessage).content) {
					embed.setColor("RED")
						.setDescription((await fetchedMessage).content);
				} else {
					const fetchedEmbed = (await fetchedMessage).embeds[0];
					if (fetchedEmbed.color) {
						embed.setColor(fetchedEmbed.color);
					}
					if (fetchedEmbed.title) {
						embed.setTitle(fetchedEmbed.title);
					}
					if (fetchedEmbed.description) {
						embed.setDescription(fetchedEmbed.description);
					}
					if (fetchedEmbed.fields) {
						embed.addFields(fetchedEmbed.fields);
					}
				}
				message.channel.send(embed);
			}
		}

		if (!message.content.startsWith(prefix)) {
			return;
		}

		// eslint-disable-next-line max-len
		const commandsChannel = await getValueFromDB<string>("servers", "commands_channel", { server_id: message.guild.id });

		if ((commandsChannel && message.channel.id !== commandsChannel) && message.author.id !== config.botOwner) {
			// eslint-disable-next-line max-len
			const msg = await message.reply(`You aren't in the ${message.guild?.channels.cache.get(commandsChannel)} channel.`);
			msg.delete({ timeout: 3000 });
			return;
		}

		const [commandName, ...args] = message.content.slice(prefix.length).split(/\s+/);
		const commandNameLower = commandName.toLowerCase();

		const command = this.client.commands.get(commandNameLower) || this.client.aliases.get(commandNameLower);

		if (!command) {
			return;
		}

		const isOwner =	command.informations.permission
			&& (command.informations.permission as string).toUpperCase() === "BOT_OWNER"
			&& message.author.id === config.botOwner;

		if (
			!command.informations.permission
			|| isOwner
			|| message.member?.hasPermission(command.informations.permission as PermissionResolvable)
		) {
			try {
				await command.run(message, args);
			} catch (error) {
				try {
					await sendError(message, error);
				} catch {}
			}
		}
	}
}
