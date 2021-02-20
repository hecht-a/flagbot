import { Message, MessageEmbed } from "discord.js";
import { COLORS } from "../../../../lib/constants";
import { getValueFromDB } from "../../../../functions/getValueFromDB";

export async function getLanguageEmbed(message: Message): Promise<MessageEmbed> {
	const language = await getValueFromDB<string>("servers", "language", { server_id: message.guild?.id });
	return new MessageEmbed()
		.setAuthor("Configuration Editor - Language", message.guild?.iconURL({ dynamic: true }) as string)
		.setColor(COLORS.purple)
		.setDescription(`Current language: ${language}`)
		.addField("✏ Edit", "Edit the language", true)
		.addField("🚪 Return", "Return to the main menu", true);
}
