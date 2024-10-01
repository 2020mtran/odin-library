const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    this.info = function() {
        let readStatus = this.hasRead ? "read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    };
}

// Example of creating a book object
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

// Log the book info
console.log(theHobbit.info());

function addBookToLibrary(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1); // Remove the book at the given index
    displayBooks(); // Refresh the display
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);

console.log(myLibrary);

function displayBooks() {
    // Get the container div 
    const libraryContainer = document.getElementById("library-container");

    // Clear the container before adding books
    libraryContainer.innerHTML = '';

    // Loop through each book and create HTML to display it
    myLibrary.forEach((book, index) => {
        // Create a div for each book
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.hasRead ? "Read" : "Not read yet"}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>`; // Add remove button with data-index

        // Add event listener to the remove button
        const removeButton = bookCard.querySelector('.remove-btn');
        removeButton.addEventListener('click', () => {
            const bookIndex = parseInt(removeButton.getAttribute('data-index')); // Get the index from the data attribute
            removeBookFromLibrary(bookIndex); // Call the remove function
        });

        libraryContainer.appendChild(bookCard);
    });
}

displayBooks();

// Show the form when the button is clicked
const newBookBtn = document.getElementById("new-book-btn");
const formContainer = document.getElementById("form-container");

newBookBtn.addEventListener("click", () => {
    formContainer.style.display = "block"; // Show the form
});

// Handle form submission
const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get values from the form
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const hasRead = document.getElementById("hasRead").checked;

    // Add the new book to the library
    addBookToLibrary(title, author, pages, hasRead);

    // Clear the form
    bookForm.reset();

    // Hide the form
    formContainer.style.display = "none";

    // Display the updated library
    displayBooks();
});