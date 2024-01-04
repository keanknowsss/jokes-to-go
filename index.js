import express from "express";

const app = express();
const port = 8000;

// Middlewares
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
	res.render("index.ejs");
});

// Server Listener
app.listen(port, () => console.log(`Listening on Port: ${port}`));
