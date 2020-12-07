import { Message } from "discord.js";
import { Command } from "../../classes/Command";
import { Client } from "../../classes/Client";
import { pushValueInDB } from "../../functions/pushValueInDB";
import { getValueFromDB } from "../../functions/getValueFromDB";

export default class Register extends Command {
	constructor(client: Client) {
		super({
			name: "register",
			description: "Set your Lichess username in the bot",
			category: "Lichess",
		}, client);
	}

	async run(message: Message, args: string[]): Promise<void> {
		if (!this.client.operational || message.author.bot || !message.guild) {
			return;
		}

		const username = await getValueFromDB("lichess", "lichess_username", { discord_id: message.member?.user.id });

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		username
			? await pushValueInDB("lichess",
				{ lichess_username: args[0] },
				{ discord_id: message.member?.user.id })
			: await pushValueInDB("lichess",
				{
					discord_id: message.member?.user.id,
					lichess_username: args[0],
				});

		message.channel.send("Registered");
	}
}
