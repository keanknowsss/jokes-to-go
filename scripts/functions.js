import axios from "axios";
import { config } from "dotenv";

config();

async function getJoke() {
	try {
		const URL = process.env.JOKES_API_URL;
		const response = await axios.get("Any", {
			baseURL: URL,
			params: {
				type: "single",
				blacklistFlags: "nsfw,religious,political,racist,sexist,explicit",
				// idRange: 28 // long joke, handle in styling
				// add handler for twopart
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error getting joke", error);
		return null;
	}
}

function test() {
	alert("here");
}

export { getJoke, test };
