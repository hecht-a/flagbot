/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	 Message, MessageEmbed, Snowflake,
} from "discord.js";
import { Command } from "../../classes/Command";
import { Client } from "../../classes/Client";
import { COLORS } from "../../lib/constants";
import { getValueFromDB } from "../../functions/getValueFromDB";
import { fetchUser } from "../../functions/fetchUser";

export default class Flagboard extends Command {
	constructor(client: Client) {
		super({
			name: "flagboard",
			description: "Check flag game's leaderboard",
			category: "Game",
		}, client);
	}

	async run(message: Message, args: string[]): Promise<void> {
		if (!this.client.operational || message.author.bot || !message.guild) {
			return;
		}
		const players = await getValueFromDB<Array<Record<string, Snowflake | number>>>(
			"games",
			{
				discord_id: "discord_id",
				flag_points: "flag_points",
			},
			{
				server_id: message.guild.id,
			},
		);

		const sorted = players.sort((a, b) => Number(b.flag_points) - Number(a.flag_points));

		const embed = new MessageEmbed()
			.setColor(COLORS.cyan)
			.setTitle("Flag game's leaderboard");

		for (let i = 0; i < sorted.length; i++) {
			const player = sorted[i];
			const user = await fetchUser(String(player.discord_id));
			embed.addField(`${user?.username}: ${player.flag_points} points`, `Top: ${i + 1}`);
		}

		message.channel.send(embed);
	}
}
