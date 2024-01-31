const refreshBtn = document.querySelector("#refresh");

let jokeText = document.querySelector("#joke-content");
let categoriesContainer = document.querySelector("#categories");

refreshBtn.addEventListener("click", async function (e) {
	let jokeData = await refreshJoke();

	jokeText.innerText = jokeData['joke']['joke'];

	let jokesCategory = "";
	jokeData.categories.forEach(category => {
		jokesCategory += `<li class="${category}">${category}</li>`;
	});

	categoriesContainer.innerHTML = jokesCategory;
});

async function refreshJoke() {
	try {
		const response = await fetch("/joke");
		const data = await response.json();
		return data;
	} catch (err) {
		console.error("Error fetching greeting:", error);
		return null;
	}
}
