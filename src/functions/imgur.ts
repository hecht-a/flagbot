export function imgur(link: string): string {
	const arrLink = link.split("/");
	return `${arrLink[0]}//i.${arrLink[2]}/${arrLink[3]}.png`;
}
