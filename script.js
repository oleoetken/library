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
    /*
        this.info = function() {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    
        };
    */
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
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
        card.dataset.id = book.id;

        const titleElement = document.createElement("p");
        titleElement.textContent = "Title: " + book.title;

        const authorElement = document.createElement("p");
        authorElement.textContent = "Author: " + book.author;

        const pagesElement = document.createElement("p");
        pagesElement.textContent = "Pages: " + book.pages;

        const readElement = document.createElement("p");
        readElement.textContent = "Read: " + (book.read ? "Yes" : "No");


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        const toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = "Toggle Read";
        toggleReadButton.classList.add("toggle-read-button");


        card.appendChild(titleElement);
        card.appendChild(authorElement);
        card.appendChild(pagesElement);
        card.appendChild(readElement);
        card.appendChild(deleteButton);
        card.appendChild(toggleReadButton);

        container.appendChild(card);

        console.log(book);
    }
}

const showButton = document.getElementById("showDialog");
const dialogForm = document.getElementById("dialogForm");
const bookForm = dialogForm.querySelector("form");
const closeButton = document.getElementById("closeButton");
const submitButton = document.getElementById("submitButton");

showButton.addEventListener("click", () => {
    dialogForm.showModal();
});

closeButton.addEventListener("click", () => {
    dialogForm.close();
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    const author = document.querySelector('input[name="author"]').value;
    const pages = document.querySelector('input[name="pages"]').value;
    const read = document.querySelector('input[name="read"]').checked;

    addBooktToLibrary(title, author, pages, read);
    displayBooks();

    bookForm.reset();
    dialogForm.close();

});

container.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        const card = e.target.closest(".book-card");
        const id = card.dataset.id;

        const index = myLibrary.findIndex(book => book.id === id);
        myLibrary.splice(index, 1);

        displayBooks();
    }
    if (e.target.classList.contains("toggle-read-button")) {
        const card = e.target.closest(".book-card");
        const id = card.dataset.id;
        const book = myLibrary.find(book => book.id === id);
        book.toggleRead();
        displayBooks();
    }
})

addBooktToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBooktToLibrary("The Lord of the Rings", "J.R.R Tolkien", 1077, false);
displayBooks();