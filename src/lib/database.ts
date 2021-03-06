import * as knex from "knex";
import * as path from "path";
import { Snowflake } from "discord.js";

const dbPath = path.join(__dirname, "../../db.db");
console.log(dbPath);
export const db = knex({
	client: "sqlite3",
	connection: {
		filename: dbPath,
	},
	useNullAsDefault: true,
});

export const defaultServerConfig = {
	prefix: "!",
	logs_active: true,
	mod_logs_active: true,
	joining_message_active: false,
	joining_message_text: "Welcome {MENTION} on **{SERVER}**! Try `{PREFIX}help` command for any help.",
	joining_role_active: false,
	leaving_message_active: false,
	leaving_message_text: "{USER} left the server :'(",
	language: "en",
};

export interface Infraction {
	id: number;
	discord_id: Snowflake;
	infraction: string;
	type: "warn" | "mute" | "kick" | "ban";
	created: number;
	expiration: number;
	duration: string;
	moderator: string;
}

export interface DbUser {
	server_id: Snowflake;
	discord_id: Snowflake;
	pseudo: string;
	last_warn: number;
	actual_sanction: "muted" | "banned";
	created: number;
	expiration: number;
}

export async function databaseCheck(): Promise<void> {
	const infractionsTableExists = await db.schema.hasTable("infractions");

	if (!infractionsTableExists) {
		await db.schema.createTable("infractions", (table) => {
			table.increments("id").primary();
			table.string("server_id");
			table.string("discord_id");
			table.text("infraction"); // reason
			table.enum("type", ["warn", "mute", "kick", "ban"]);
			table.timestamp("created");
			table.timestamp("expiration");
			table.string("duration");
			table.string("moderator");
		});
		console.info("Infractions table created successfully.");
	}

	const usersTableExists = await db.schema.hasTable("users");

	if (!usersTableExists) {
		await db.schema.createTable("users", (table) => {
			table.string("server_id");
			table.string("discord_id");
			table.primary(["server_id", "discord_id"]);
			table.string("pseudo");
			table.timestamp("last_warn");
			table.enum("actual_sanction", ["muted", "banned"]);
			table.timestamp("created");
			table.timestamp("expiration");
		});
		console.info("Users table created successfully.");
	}

	const serverTableExists = await db.schema.hasTable("servers");

	if (!serverTableExists) {
		await db.schema.createTable("servers", (table) => {
			table.string("server_id").primary();
			table.string("prefix");
			// votes
			table.string("votes_channel");
			// logs
			table.boolean("logs_active");
			table.string("logs_channel");
			// modLogs
			table.boolean("mod_logs_active");
			table.string("mod_logs_channel");
			// joining
			table.boolean("joining_message_active");
			table.string("joining_message_channel");
			table.text("joining_message_text");
			// joining role
			table.boolean("joining_role_active");
			table.string("joining_role_id");
			// leaving
			table.boolean("leaving_message_active");
			table.string("leaving_message_channel");
			table.text("leaving_message_text");
			// muterole
			table.string("mute_role_id");
			// bot language
			table.string("language");
			// commands
			table.string("commands_channel");
		});
		console.info("Servers table created successfully.");
	}

	const lichessTableExists = await db.schema.hasTable("lichess");

	if (!lichessTableExists) {
		await db.schema.createTable("lichess", (table) => {
			table.string("discord_id").primary();
			table.string("lichess_username");
		});
		console.info("Lichess table created successfully.");
	}

	const gamesTableExists = await db.schema.hasTable("games");

	if (!gamesTableExists) {
		await db.schema.createTable("games", (table) => {
			table.string("server_id");
			table.string("discord_id");
			table.primary(["server_id", "discord_id"]);
			table.integer("flag_points");
			table.integer("flag_wins");
			table.integer("flag_loses");
		});
		console.info("Lichess table created successfully.");
	}
}
