import { Message, MessageEmbed } from "discord.js";
import axios from "axios";
import { Command } from "../../classes/Command";
import { Client } from "../../classes/Client";
// import { getValueFromDB } from "../../functions/getValueFromDB";

export default class Flag extends Command {
	constructor(client: Client) {
		super({
			name: "flag",
			description: "Check bot's ping",
			category: "Game",
		}, client);
	}

	async run(message: Message, args: string[]): Promise<void> {
		if (!this.client.operational || message.author.bot || !message.guild) {
			return;
		}

		// const language = await getValueFromDB<string>("servers", "language", { server_id: message.guild.id });

		const countries: Record<string, string> = (await axios.get(`https://flagcdn.com/en/codes.json`)).data;

		const n = Math.floor(Math.random() * Object.keys(countries).length);
		console.log(countries[Object.keys(countries)[n]]);

		const embed = new MessageEmbed()
			.setImage("https://flagcdn.com/48x36/za.png");

		message.channel.send(embed);
	}
}
