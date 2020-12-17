import { CollectorFilter, Message, MessageEmbed } from "discord.js";
import { Command } from "../../classes/Command";
import { Client } from "../../classes/Client";
import { react } from "../../functions/react";
import { COLORS } from "../../lib/constants";
import { imgur } from "../../functions/imgur";
// import { getValueFromDB } from "../../functions/getValueFromDB";
// import { pushValueInDB } from "../../functions/pushValueInDB";

export default class Geoguessr extends Command {
	constructor(client: Client) {
		super({
			name: "geoguessr",
			description: "Check bot's ping",
			category: "Game",
		}, client);
	}

	async run(message: Message, args: string[]): Promise<void> {
		if (!this.client.operational || message.author.bot || !message.guild) {
			return;
		}

		// let playerPoints = await getValueFromDB<number>(
		// 	"games",
		// 	"geoguessr",
		// 	{
		// 		discord_id: message.member?.user.id,
		// 		server_id: message.guild.id,
		// 	},
		// );
		// if (playerPoints === undefined) {
		// 	pushValueInDB(
		// 		"games",
		// 		{
		// 			server_id: message.guild.id,
		// 			discord_id: message.member?.user.id,
		// 			geoguessr_points: 0,
		// 			geoguessr_wins: 0,
		// 			geoguessr_loses: 0,
		// 		},
		// 	);
		// 	playerPoints = await getValueFromDB<number>(
		// 		"games",
		// 		"geoguessr_points",
		// 		{
		// 			discord_id: message.member?.user.id,
		// 			server_id: message.guild.id,
		// 		},
		// 	);
		// }

		// let wins = await getValueFromDB<number>(
		// 	"games",
		// 	"geoguessr_wins",
		// 	{
		// 		discord_id: message.member?.user.id,
		// 		server_id: message.guild.id,
		// 	},
		// );

		// let loses = await getValueFromDB<number>(
		// 	"games",
		// 	"geoguessr_loses",
		// 	{
		// 		discord_id: message.member?.user.id,
		// 		server_id: message.guild.id,
		// 	},
		// );

		const emotes = ["1️⃣", "2️⃣", "3️⃣"];
		const result: Record<string, string> = {
			"1️⃣": "",
			"2️⃣": "",
			"3️⃣": "",
		};
		const countries: Record<string, string> = {
			"machu picchu": "https://imgur.com/wWvzrEq",
			"mont rushmore": "https://imgur.com/z7uLGkM",
			"statue de la liberté": "https://imgur.com/DA4cxUg",
			colisé: "https://imgur.com/Pb4wgOk",
		};
		const randomCountries: string[] = [];

		const nCountries = Math.floor(Math.random() * Object.keys(countries).length);
		const nEmotes = Math.floor(Math.random() * emotes.length);

		const link = countries[Object.keys(countries)[nCountries]];
		const countryChoice = Object.keys(countries)[nCountries];
		result[emotes[nEmotes]] = countryChoice;
		randomCountries.push(countryChoice);

		for (let i = 0; i < emotes.length; i++) {
			let n = Math.floor(Math.random() * Object.keys(countries).length);
			let country = Object.keys(countries)[nCountries];
			while (randomCountries.includes(country)) {
				n = Math.floor(Math.random() * Object.keys(countries).length);
				country = Object.keys(countries)[n];
			}
			console.log(country);
			if (result[emotes[i]] === "") {
				result[emotes[i]] = country;
				randomCountries.push(country);
			}
		}

		const embed = new MessageEmbed()
			.setTitle("Geoguessr")
			.setThumbnail(`${imgur(link)}`)
			.setFooter(message.author.username);

		embed.addField("What countries is this flag from?", "-----");

		for (const [key, value] of Object.entries(result)) {
			embed.addField(`${key} \`${value}\``, "\u200b", true);
		}

		const msg = await message.channel.send(embed);
		react(emotes, msg);

		// eslint-disable-next-line max-len
		const filter: CollectorFilter = (reaction, user) => emotes.includes(reaction.emoji.name) && user.id === message.author.id;
		const timeMsg = await message.channel.send("You have 30 seconds to answer.");
		timeMsg.delete({ timeout: 3000 });

		msg.awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] })
			.then(async (collected) => {
				const reaction = collected.first();
				if (!reaction) {
					return;
				}
				// const nbrPoint = Math.floor((Math.random() + 1) * 3);

				msg.reactions.removeAll();
				embed.fields = [];
				if (reaction.emoji.name === emotes[nEmotes]) {
					// await pushValueInDB(
					// 	"games",
					// 	{
					// 		geoguessr_wins: wins + 1,
					// 		geoguessr_points: playerPoints + nbrPoint < 0
					// 			? 0
					// 			: playerPoints + nbrPoint,
					// 	},
					// 	{
					// 		discord_id: message.member?.user.id,
					// 		server_id: message.guild?.id,
					// 	},
					// );
					// playerPoints = await getValueFromDB<number>(
					// 	"games",
					// 	"geoguessr_points",
					// 	{
					// 		discord_id: message.member?.user.id,
					// 		server_id: message.guild?.id,
					// 	},
					// );
					// wins = await getValueFromDB<number>(
					// 	"games",
					// 	"geoguessr_wins",
					// 	{
					// 		discord_id: message.member?.user.id,
					// 		server_id: message.guild?.id,
					// 	},
					// );
					embed
						.setColor(COLORS.green)
						.addField(`The good answer was ${emotes[nEmotes]} \`${countryChoice}\``, "Win !");
					// .addField(`You win ${nbrPoint} points`, `You have ${playerPoints} points.`);
				} else {
					// await pushValueInDB(
					// 	"games",
					// 	{
					// 		geoguessr_loses: loses + 1,
					// 		geoguessr_points: playerPoints - nbrPoint < 0
					// 			? 0
					// 			: playerPoints - nbrPoint,
					// 	},
					// 	{
					// 		discord_id: message.member?.user.id,
					// 		server_id: message.guild?.id,
					// 	},
					// );
					// playerPoints = await getValueFromDB<number>(
					// 	"games",
					// 	"geoguessr_points",
					// 	{
					// 		discord_id: message.member?.user.id,
					// 		server_id: message.guild?.id,
					// 	},
					// );
					// loses = await getValueFromDB<number>(
					// 	"games",
					// 	"geoguessr_loses",
					// 	{
					// 		discord_id: message.member?.user.id,
					// 		server_id: message.guild?.id,
					// 	},
					// );
					embed
						.setColor(COLORS.red)
						.addField(`The good answer was ${emotes[nEmotes]} \`${countryChoice}\``, "Loose !");
					// .addField(`You loose ${nbrPoint} points`, `You have ${playerPoints} points.`);
				}
				// const winrate = (wins / (wins + loses)) * 100;
				// embed.addField(`You have ${wins} wins and ${loses} loses.`, `Your winrate is ${winrate.toFixed(1)}%.`);
				return msg.edit(embed);
			});
	}
}
