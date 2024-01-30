import axios from "axios";

async function getJoke() {
	const JOKES_API_URL = "https://v2.jokeapi.dev/joke";

	try {
		const response = await axios.get("Any", {
			baseURL: JOKES_API_URL,
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
