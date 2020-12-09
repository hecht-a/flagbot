// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toObject(baseString: string): any {
	return JSON.parse(JSON.stringify(baseString));
}
