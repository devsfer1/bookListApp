const form = document.getElementById('form');
const table = document.getElementById('table');
const checkbox = document.getElementById('checkbox');
const bookLIst = document.getElementById('book-list');

// book class
class Book {
  constructor(title, author, genre) {
    this.title = title,
    this.author = author,
    this.genre = genre
  }
} 

// UI class
class UI {
  static showBooksInTheDom(book) {
    let tr = document.createElement('tr');
    tr.className = 'trow';
    tr.innerHTML = 
   `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.genre}</td>
    <td><i class="far fa-times-circle delete-btn"></i></td>`

    bookLIst.appendChild(tr);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete-btn')) {
      el.parentElement.parentElement.remove();
    }
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // get DOM values
  const titleInput = document.getElementById('titleInput').value;
  const authorInput = document.getElementById('authorInput').value;
  const genreInput = document.getElementById('genreInput').value;

  // instantiate book
  const book = new Book(titleInput, authorInput, genreInput);

  form.reset();
  UI.showBooksInTheDom(book);
});

// remove book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);
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









