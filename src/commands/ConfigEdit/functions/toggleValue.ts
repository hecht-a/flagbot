import { EmbedMessage } from "../index";
import { getValueFromDB } from "../../../functions/getValueFromDB";
import { pushValueInDB } from "../../../functions/pushValueInDB";
import { reactionsHandler } from "./reactionsHandler";

export async function toggleValue(source: EmbedMessage, column: string): Promise<void> {
	const { message, embed } = source;

	const value = await getValueFromDB<number>("servers", column, { server_id: message.guild?.id });

	await pushValueInDB("servers", { [column]: !value }, { server_id: message.guild?.id });

	await message.edit("", await embed(message));
	await reactionsHandler(source);
}
