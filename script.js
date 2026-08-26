const container = document.querySelector(".container");
const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    };
}

/*const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info());*/

function addBooktToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    container.replaceChildren();

    for (let book of myLibrary) {
        const card = document.createElement("div");
        card.classList.add("book-card");

        const titleElement = document.createElement("p");
        titleElement.textContent = "Title: " + book.title;

        const authorElement = document.createElement("p");
        authorElement.textContent = "Author: " + book.author;

        const pagesElement = document.createElement("p");
        pagesElement.textContent = "Pages: " + book.pages;

        const readElement = document.createElement("p");
        readElement.textContent = "Read: " + (book.read ? "Yes" : "No");

        card.appendChild(titleElement);
        card.appendChild(authorElement);
        card.appendChild(pagesElement);
        card.appendChild(readElement);

        container.appendChild(card);

        console.log(book);
    }
}

const showButton = document.getElementById("showDialog");
const dialogForm = document.getElementById("dialogForm");
const closeButton = document.getElementById("closeButton");

showButton.addEventListener("click", () => {
    dialogForm.showModal();
});

closeButton.addEventListener("click", () => {
    dialogForm.close();
})

addBooktToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBooktToLibrary("The Lord of the Rings", "J.R.R Tolkien", 1077, false);
displayBooks();