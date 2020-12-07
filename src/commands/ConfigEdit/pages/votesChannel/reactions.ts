import { changePage } from "../../functions/changePage";
import { editValue } from "../../functions/editValue";
import { EmbedMessage, getMainEmbedMessage, ReactionsEffects } from "../../index";
import { getChannelIdFromString } from "../../functions/getChannelIdFromString";
import { getTextChannelFilter } from "../../filters/textChannel";

export function getVotesChannelReactionsEffects(embedMessage: EmbedMessage): ReactionsEffects {
	const { message, author } = embedMessage;

	return ({
		"✏": async (): Promise<void> => editValue(
			embedMessage,
			getTextChannelFilter(embedMessage),
			"votes_channel",
			getChannelIdFromString,
		),
		"🚪": async (): Promise<void> => changePage(getMainEmbedMessage(message, author)),
	});
}
