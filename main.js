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
  static showSuccess(title, author, isbn) {

    title.classList.remove('error');
    author.classList.remove('error');
    isbn.classList.remove('error');
    
    alert('Book successfully added');
  }

  static showError(title, author, isbn) {
    title.classList.add('error');
    author.classList.add('error');
    isbn.classList.add('error');

    alert('Please enter at least one valid character');
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
  const title = document.getElementById('titleInput');
  const author = document.getElementById('authorInput');
  const isbn = document.getElementById('isbnInput');

  // instantiate book
  const book = new Book(title.value, author.value, isbn.value);

  if(title.value.length == "" || author.value.length == "" || isbn.value.length == "") {
    InputLength.showError(title, author, isbn);
  } else {
    InputLength.showSuccess(title, author, isbn);

    // Add book UI
    UI.showBooksInTheDom(book);

    // Add book local storage
    Store.addBook(book);
  }
    form.reset();
});

// remove book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  alert('Book successfully removed');

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









