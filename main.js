const form = document.getElementById('form');
const table = document.getElementById('table');
const checkbox = document.getElementById('checkbox');
const bookLIst = document.getElementById('book-list');

// Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title,
    this.author = author,
    this.isbn = isbn
  }
} 

// UI class
class UI {
  static displayStoredBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.showBooksInTheDom(book));
  }

  static showBooksInTheDom(book) {
    let tr = document.createElement('tr');
    tr.className = 'trow';
    tr.innerHTML = 
   `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><i class="far fa-times-circle delete-btn"></i></td>`

    bookLIst.appendChild(tr);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete-btn')) {
      el.parentElement.parentElement.remove();
    }
  }
}

// Input Length Class
class InputLength {
  static showSuccess(input, message) {

  }

  static checkLength(title, author, isbn) {
    const titleLength = title.value.length;
    const authorLength = author.value.length;
    const isbnLength = isbn.value.length;
  }
}

// Store class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Display stored books
document.addEventListener('DOMContentLoaded', UI.displayStoredBooks);

// Add Book
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // get DOM values
  const titleInput = document.getElementById('titleInput').value;
  const authorInput = document.getElementById('authorInput').value;
  const isbnInput = document.getElementById('isbnInput').value;

  // instantiate book
  const book = new Book(titleInput, authorInput, isbnInput);

  form.reset();

  // Add book UI
  UI.showBooksInTheDom(book);

  // Check Input Length
  InputLength.checkLength(titleInput, authorInput,isbnInput);

  // Add book local storage
  Store.addBook(book);
});

// remove book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

// dark mode
checkbox.addEventListener('change', (e) => {
  document.body.classList.toggle('dark');
  document.querySelector('.title').classList.toggle('light-text');

  const inputTitle = document.querySelectorAll('.input-title');
  const th = document.querySelectorAll('.th');

  for(let i = 0; i < inputTitle.length; i++) {
    inputTitle[i].classList.toggle('light-text');
    th[i].classList.toggle('light-text');
  }
});









