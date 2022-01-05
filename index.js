const root = document.documentElement;
const grid = document.getElementById('cards-grid');
const overlay = document.getElementById('overlay');
const newBookBtn = document.getElementById('add');
const newBookModal = document.getElementById('new-card-modal');
const modalMessage = document.getElementById('modal-message');
const form = document.getElementById('new-card-form');
const closeModalBtn = document.getElementById('close-modal');
const sidebar = document.getElementById('main-sidebar');
const sidebarHidden = document.getElementById('hidden-sidebar');

function Book(title='Default', author='Unknown', info='') {
  this.title = title;
  this.author = author;
  this.info = info;
};

const library = {
  books: [],

  store(book) {
    let titles = library.books.map(book => book.title);
    let info = library.books.map(book => book.info)
    if (book.author == false) return 'Error: Book has no author';
    else if (titles.indexOf(book.title) != -1) {
      return 'Error: Book with that name already exists';
    }
    else if (info.indexOf(book.info) != -1) {
      return 'Error: Book already exists';
    };
    library.createHTML(book);
    library.books.push(book);
    return 'Book successfully created!';
  },

  remove(book) {
    library.books.splice(library.books.indexOf(book), 1);
    thisBook = document.getElementById(`${book.title}`);
    while (thisBook.hasChildNodes()) {
      thisBook.removeChild(thisBook.lastChild)
    };
    grid.removeChild(thisBook);
  },

  createHTML(book) {
    bookHTML = document.createElement('div');
    bookHTML.classList.add('card');
    bookHTML.id = book.title

    bookHeader = document.createElement('div');
    bookHeader.classList.add('card-header');

    bookTitle = document.createElement('p');
    bookTitle.classList.add('card-title')
    bookTitle.textContent = book.title;
    bookHeader.appendChild(bookTitle);

    bookAuthor = document.createElement('p');
    bookAuthor.classList.add('card-author');
    bookAuthorText = document.createElement('em');
    bookAuthorText.textContent = `by: ${book.author}`;
    bookAuthor.appendChild(bookAuthorText);
    bookHeader.appendChild(bookAuthor);

    bookContent = document.createElement('div');
    bookContent.classList.add('card-content');
    bookContent.textContent = `${book.info}`;

    bookFooter = document.createElement('div');
    bookFooter.classList.add('card-footer');

    bookDel = document.createElement('button');
    bookDel.classList.add('card-delete');
    bookDel.addEventListener('click', (e) => {
      library.remove(book);
    })
    bookDel.textContent = 'Delete';

    bookRead = document.createElement('div');
    bookRead.classList.add('card-read');
    bookInput = document.createElement('input');
    bookInput.textContent = 'Read';
    bookInput.type = 'checkbox';
    bookRead.appendChild(bookInput);

    bookFooter.appendChild(bookDel);
    bookFooter.appendChild(bookRead);

    bookHTML.appendChild(bookHeader);
    bookHTML.appendChild(bookContent);
    bookHTML.appendChild(bookFooter);

    grid.appendChild(bookHTML);
  },
};

newBookBtn.addEventListener('click', (e) => {
  newBookModal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
});

closeModalBtn.addEventListener('click', (e) => {
  newBookModal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let formData = new FormData(form);
  book = new Book(...formData.values());
  modalMessage.textContent = library.store(book);
});

sidebarHidden.addEventListener('click', (e) => {
  sidebarHidden.textContent = sidebar.classList.contains('hidden') ? '-' : '+'
  sidebar.classList.toggle('hidden');
});