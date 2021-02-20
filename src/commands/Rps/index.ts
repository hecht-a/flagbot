import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../classes/Command";
import { Client } from "../../classes/Client";
import { COLORS } from "../../lib/constants";
import { imgur } from "../../functions/imgur";

export default class Rps extends Command {
	constructor(client: Client) {
		super({
			name: "rps",
			description: "Rock Paper Scissors",
			category: "Game",
		}, client);
	}

	async run(message: Message, args: string[]): Promise<void> {
		if (!this.client.operational || message.author.bot || !message.guild) {
			return;
		}
		const humanChoice = args[0];
		const choices = ["rock", "paper", "scissors"];

		if (!humanChoice || !choices.includes(humanChoice)) {
			return;
		}

		const botChoice = choices[Math.floor(Math.random() * choices.length)];

		const links: Record<string, string> = {
			paperxpaper: "https://imgur.com/ybjsoVo",
			paperxrock: "https://imgur.com/aC34w54",
			paperxscissors: "https://imgur.com/D7J43gf",
			rockxpaper: "https://imgur.com/7JZUe6N",
			rockxrock: "https://imgur.com/wXC6dTO",
			rockxscissors: "https://imgur.com/8uDhoLm",
			scissorsxpaper: "https://imgur.com/5aK0DMj",
			scissorsxrock: "https://imgur.com/aaKB0WS",
			scissorsxscissors: "https://imgur.com/ElBLARK",
		};

		const embed = new MessageEmbed()
			.setTitle("Rock Paper Scissors")
			.setImage(imgur(links[`${humanChoice}x${botChoice}`]));

		if (humanChoice === botChoice) {
			embed.setColor(COLORS.cyan)
				.setDescription("Draw");
			message.channel.send(embed);
			return;
		}

		if ((humanChoice === "rock" && botChoice === "scissors")
            || (humanChoice === "paper" && botChoice === "rock")
            || (humanChoice === "scissors" && botChoice === "paper")) {
			embed.setColor(COLORS.green)
				.setDescription("You won");
		} else {
			embed.setColor(COLORS.red)
				.setDescription("Bot won");
		}
		message.channel.send(embed);
	}
}
