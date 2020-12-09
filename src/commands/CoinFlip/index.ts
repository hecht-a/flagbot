import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../classes/Command";
import { Client } from "../../classes/Client";
import { COLORS } from "../../lib/constants";
import { imgur } from "../../functions/imgur";

export default class CoinFlip extends Command {
	constructor(client: Client) {
		super({
			name: "coinflip",
			description: "Coinflip",
			category: "Game",
		}, client);
	}

	async run(message: Message, args: string[]): Promise<void> {
		if (!this.client.operational || message.author.bot || !message.guild) {
			return;
		}
		const humanChoice = args[0];
		const choices = ["heads", "tails"];

		if (!humanChoice || !choices.includes(humanChoice)) {
			return;
		}

		const links: Record<string, string> = {
			heads: "https://imgur.com/HE1SOgc",
			tails: "https://imgur.com/b5Vq1Pk",
		};

		const botChoice = choices[Math.floor(Math.random() * choices.length)];

		const embed = new MessageEmbed()
			.setTitle("Coin Flip")
			.setImage(imgur(links[`${botChoice}`]));

		if (humanChoice === botChoice) {
			embed
				.setColor(COLORS.green)
				.setDescription("You won");
		} else {
			embed
				.setColor(COLORS.red)
				.setDescription("You loose");
		}

		message.channel.send(embed);
	}
}
