const form = document.getElementById('form');
const table = document.getElementById('table');
const checkbox = document.getElementById('checkbox');

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
    <td><span class="delete-btn">X</span></td>`

    table.appendChild(tr);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete-btn')) {
      el.parentElement.parentElement.remove();
    }

    console.log(el.parentElement.parentElement);
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
document.getElementById('book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);

  console.log(e.target);
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









