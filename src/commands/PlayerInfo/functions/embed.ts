/* eslint-disable multiline-ternary */
import { Message, MessageEmbed } from "discord.js";
import { formatDate } from "../../../functions/formatDate";
import { stringNormalize } from "../../../functions/stringNormalize";
import { toObject } from "../../../functions/toObject";
import { getCountryFromCode } from "../../../functions/getCountryFromCode";
import { COLORS } from "../../../lib/constants";

export async function getPlayerEmbed(message: Message, data: Record<string, string>): Promise<MessageEmbed> {
	if (message.author.bot || !message.guild || !message.member) {
		return new MessageEmbed().setColor(COLORS.purple)
			.setTitle("There was an error");
	}

	const country = await getCountryFromCode((toObject(data.profile).country).toLowerCase());

	const msg = new MessageEmbed()
		.setAuthor(data.username, "https://www.pikpng.com/pngl/m/341-3415048_lichess-org-official-logo-clipart.png")
		.setColor(COLORS.purple)
		.setTitle(data.username)
		.addField("__First name__", toObject(data.profile).firstName, true)
		.addField("__Last name__", toObject(data.profile).lastName, true)
		.addField("__Country__", country, true)
		.addField("__Created at__", formatDate(Number(data.createdAt)), true)
		.addField("__Lichess profile__", `[link](${data.url})`, true)
		.addField("\u200b", "\u200b", true);

	for (const [key, value] of Object.entries(data.perfs)) {
		const json = toObject(value);
		msg.addField(
			`__${stringNormalize(key)}__`,
			`Games: ${json.games}\nRating: ${json.rating}`,
			true,
		);
	}
	const { links } = toObject(data.profile);
	if (links) {
		msg.addField("\u200b", "\u200b", true);
		links.split("\r\n").forEach((link: string) => {
			const names = link.replace("http://", "").replace("https://", "").replace("www.", "").split(/[/?#]/)[0];

			msg.addField(`__${names}__`, `[link](${link})`, true);
		});
	}
	return msg;
}
