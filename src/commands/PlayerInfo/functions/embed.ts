import { Message, MessageEmbed } from "discord.js";
import { COLORS } from "../../../lib/constants";

export function getPlayerEmbed(message: Message, data: Record<string, string>): MessageEmbed {
	const msg = new MessageEmbed()
		.setAuthor(message.member?.user.username, message.guild?.iconURL({ dynamic: true }) as string)
		.setColor(COLORS.purple)
		.setTitle(data.username);

	for (const [key, value] of Object.entries(data.perfs)) {
		// msg.addField(
		// 	key,
		// 	`Games: ${value.games}\nRating: ${value.rating}`,
		// 	true,
		// );
		console.log(typeof value);
	}

	return msg;
}
