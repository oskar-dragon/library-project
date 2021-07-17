const booksList = document.querySelector(".books-list");
const bookForm = document.querySelector(".book-form");
let myLibrary = [];

/* EVENTS */
bookForm.addEventListener("submit", addBookToLibrary);
booksList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn--delete")) deleteBook(e.target.dataset.index);
  if (e.target.classList.contains("btn--status")) changeStatus(e.target);
});

/* FUNCTIONS */
function displayBooks() {
  booksList.innerHTML = "";

  myLibrary.forEach((book, index) => {
    booksList.innerHTML += `
        <div class="book">
        <span class="book__name">${book.name}</span>
        <span class="book__author">${book.author}</span>
        <button data-index="${index}" class="btn btn--status">${book.isRead ? "Read" : "Unread"}</button>
        <button data-index="${index}" class="btn btn--delete">Delete</button>
      </div>`;
  });
}

displayBooks();

function Book(name, author, isRead) {
  this.name = name;
  this.author = author;
  this.isRead = isRead;
}

function addBookToLibrary(e) {
  e.preventDefault();

  let formData = new FormData(e.target);
  let bookName = formData.get("book");
  let author = formData.get("author");
  let isRead = Boolean(formData.get("status"));
  console.log(isRead);

  let newBook = new Book(bookName, author, isRead);
  myLibrary.push(newBook);

  displayBooks();

  bookForm.reset();
}

function deleteBook(index) {
  myLibrary.splice(index, 1);

  displayBooks();
}

function changeStatus(element) {
  if (element.innerHTML === "Read") {
    myLibrary[element.dataset.index].isRead = false;
  } else {
    myLibrary[element.dataset.index].isRead = true;
  }

  displayBooks();
}
