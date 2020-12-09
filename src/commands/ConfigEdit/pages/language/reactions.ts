import { Message } from "discord.js";
import { changePage } from "../../functions/changePage";
import { editValue } from "../../functions/editValue";
import { EmbedMessage, getMainEmbedMessage, ReactionsEffects } from "../../index";

export function getLanguageReactionsEffects(embedMessage: EmbedMessage): ReactionsEffects {
	const { message, author } = embedMessage;
	const editFilter = (target: Message): boolean => target.content.length <= 6
		&& !target.content.match(/\s+/);
	return ({
		"✏": async (): Promise<void> => editValue(
			embedMessage,
			editFilter,
			"language",
		),
		"🚪": async (): Promise<void> => changePage(getMainEmbedMessage(message, author)),
	});
}
