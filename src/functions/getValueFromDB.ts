import { DbRecord } from "knex";
import { db } from "../lib/database";

// eslint-disable-next-line max-len
export async function getValueFromDB<T>(table: string, column: string | DbRecord<unknown>, where?: DbRecord<unknown>): Promise<T> {
	const result = where
		? await db.select(column).from(table).where(where)
		: await db.select(column).from(table);
	return typeof column === "string"
		? result[0]?.[column]
		: result;
}
