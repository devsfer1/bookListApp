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
    tr.innerHTML = 
   `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.genre}</td>`

    table.appendChild(tr);
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


// dark mode
checkbox.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  document.querySelector('.title').classList.toggle('light-text');

  const inputTitle = document.querySelectorAll('.input-title');
  const th = document.querySelectorAll('.th');

  for(let i = 0; i < inputTitle.length; i++) {
    inputTitle[i].classList.toggle('light-text');
    th[i].classList.toggle('light-text');
  }

});









