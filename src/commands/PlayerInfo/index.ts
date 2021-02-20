import { Message } from "discord.js";
import axios from "axios";
import { Command } from "../../classes/Command";
import { Client } from "../../classes/Client";
import { getValueFromDB } from "../../functions/getValueFromDB";
import { getPlayerEmbed } from "./functions/embed";

export default class PlayerInfo extends Command {
	constructor(client: Client) {
		super({
			name: "playerinfo",
			description: "Set your Lichess username in the bot",
			category: "Lichess",
			aliases: ["plinfos", "playerinfos", "plinfo", "plstats"],
		}, client);
	}

	async run(message: Message, args: string[]): Promise<void> {
		if (!this.client.operational || message.author.bot || !message.guild) {
			return;
		}
		// eslint-disable-next-line max-len
		const username: string = await getValueFromDB("lichess", "lichess_username", { discord_id: message.member?.id });

		const getUser = args[0] || username;

		const { data } = await axios.get(`https://lichess.org/api/user/${getUser}`);

		message.channel.send(await getPlayerEmbed(message, data));
	}
}
