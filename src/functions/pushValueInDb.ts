import { DbRecord } from "knex";
import { db } from "../lib/database";

// eslint-disable-next-line max-len
export async function pushValueInDB(table: string, update: DbRecord<unknown>, where?: DbRecord<unknown>): Promise<void> {
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	where
		? await db
			.update(update)
			.into(table)
			.where(where)
		: await db.insert(update).into(table);
}
