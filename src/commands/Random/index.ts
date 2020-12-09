import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../classes/Command";
import { Client } from "../../classes/Client";
import { COLORS } from "../../lib/constants";

export default class Random extends Command {
	constructor(client: Client) {
		super({
			name: "random",
			description: "Generate random number",
			category: "Game",
			usage: (prefix) => `${prefix}random [range]`,
		}, client);
	}

	async run(message: Message, args: string[]): Promise<void> {
		if (!this.client.operational || message.author.bot || !message.guild) {
			return;
		}

		const range = Number(args[0]) || 10;

		const embed = new MessageEmbed()
			.setTitle("Coin Flip")
			.setColor(COLORS.cyan)
			.setDescription(`You have 30secondes to choose a number between 0 and ${range}`);
		const collecMsg = message.channel.send({ embed });

		const collectorFilter = (msg: Message): boolean => msg.channel === message.channel
            && msg.author === message.author
            && !msg.author.bot;

		const collected = await message.channel.awaitMessages(collectorFilter, { max: 1, time: 20000 });

		const humanChoice = collected.first();

		if (!humanChoice) {
			return;
		}

		humanChoice.delete();

		const botChoice = Math.floor(Math.random() * range);

		embed.addField(`Your number is ${humanChoice}`, `The bot's number is ${botChoice}`);

		if (Number(humanChoice.content) === botChoice) {
			(await collecMsg).edit(embed.setColor(COLORS.green)
			     .setDescription("You won"));
		} else {
			(await collecMsg).edit(embed.setColor(COLORS.red)
			     .setDescription("You loose"));
		}
	}
}
