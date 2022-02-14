async function getBooks() {
	const URL = "https://raw.githubusercontent.com/pauloewerton/testes-json/main/livros.json";
	const request = new Request(URL);

	const response = await fetch(request);
	const books = await response.json();

	populate(books.livros);
}

function populate(books) {
	for(let book of books)
		createCard(book);
}

function createCard(book) {
	let section = document.querySelector("section");
	let card = document.createElement("div");
	card.classList.add("card");

	card.appendChild(cardImg(book));
	card.appendChild(title(book));
	card.appendChild(description(book));
	card.appendChild(readMore());
	section.appendChild(card);
}

function cardImg(book) {
	let cardImg = document.createElement("div");
	cardImg.classList.add("card-img");

	let img = document.createElement("img");
	img.classList.add("book-img");
	img.setAttribute('src', book.imgCapa);

	cardImg.appendChild(img);
	return cardImg;
}

function title(book) {
	let h2 = document.createElement("h2");
	h2.textContent = book.titulo;
	return h2;
}

function description(book) {
	let p = document.createElement("p");
	let description = book.descricao
	.replaceAll("<p>", "").replaceAll("</p>", "")
	.replaceAll("<", "").replaceAll(">", "").substring(0, 100);

	p.textContent = `Description: ${description}...`;
	return p;
}

function readMore() {
	let a = document.createElement("a");
	a.textContent = "READ MORE";
	a.setAttribute("href", "#");
	return a;
}

getBooks();