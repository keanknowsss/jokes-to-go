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
		const response = await axios.get("any", {
			baseURL: JOKES_API_URL,
			params: {
				type: "single"
			}
		});
		console.log(response["data"]);
		res.render("index.ejs", { joke: response["data"] });
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
});

// Server Listener
app.listen(port, () => console.log(`Listening on Port: ${port}`));
