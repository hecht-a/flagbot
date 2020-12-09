import axios from "axios";

export async function getCountryFromCode(countryCode: string): Promise<string> {
	const countries: Record<string, string> = (await axios.get(`https://flagcdn.com/en/codes.json`)).data;

	return countries[countryCode];
}
