import express from "express";
import axios from "axios";

const app = express();
const port = 8000;

const JOKES_API_URL = "https://v2.jokeapi.dev/joke";

// Middlewares
app.use(express.static("public"));

// Routes
app.get("/", async (req, res) => {
	try {
		const response = await axios.get("/Any", {
			baseURL: JOKES_API_URL,
			params: {
				type: "single",
				blacklistFlags: "nsfw,religious,political,racist,sexist,explicit",
				// idRange: 28 // long joke, handle in styling
				// add handler for twopart
			},
		});
		let joke = response['data']
		let categories = [joke['category']];
		
		if (joke['flags']['nsfw'])
			categories.push('Nsfw');
		if (joke['flags']['religious'])
			categories.push('Religious');
		if (joke['flags']['political'])
			categories.push('Political');
		if (joke['flags']['sexist'])
			categories.push('Sexist');
		if (joke['flags']['explicit'])
			categories.push('Explicit');

		// console.log(response["data"]);
		console.log(categories);
		res.render("index.ejs", { joke, categories });
	} catch (error) {
		if (error['code'] === 'ENOTFOUND') {
			console.log('no joke') // TODO: handle error
		} else {
			console.error(error);
		}
		return res.sendStatus(500);
	}
});

// Server Listener
app.listen(port, () => console.log(`Listening on Port: ${port}`));
