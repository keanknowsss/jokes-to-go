import express from "express";
import { getJoke } from "./scripts/functions.js";
import path from "path";

const app = express();
const port = 8000;
const __dirname = path.resolve();

// Middlewares
app.use(express.static("public"));

// For Deployment Purposes
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));

// Routes
app.get("/", async (req, res) => {
	try {
		const joke = await getJoke();
		let categories = [joke["category"]];

		if (joke["flags"]["nsfw"]) categories.push("Nsfw");
		if (joke["flags"]["religious"]) categories.push("Religious");
		if (joke["flags"]["political"]) categories.push("Political");
		if (joke["flags"]["sexist"]) categories.push("Sexist");
		if (joke["flags"]["explicit"]) categories.push("Explicit");

		res.render("index.ejs", { joke, categories });
	} catch (error) {
		if (error["code"] === "ENOTFOUND") {
			console.log("no joke"); // TODO: handle error
		} else {
			console.error(error);
		}
		return res.sendStatus(500);
	}
});

app.get("/joke", async function (req, res) {
	try {
		const joke = await getJoke();
		let categories = [joke["category"]];

		if (joke["flags"]["nsfw"]) categories.push("Nsfw");
		if (joke["flags"]["religious"]) categories.push("Religious");
		if (joke["flags"]["political"]) categories.push("Political");
		if (joke["flags"]["sexist"]) categories.push("Sexist");
		if (joke["flags"]["explicit"]) categories.push("Explicit");

		// console.log(response["data"]);
		res.json({ joke, categories });
	} catch (error) {
		if (error["code"] === "ENOTFOUND") {
			console.log("no joke"); // TODO: handle error
		} else {
			console.error(error);
		}
		return res.sendStatus(500);
	}
});

// app.get()

// Server Listener
app.listen(port, () => console.log(`Listening on Port: ${port}`));
