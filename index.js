const grid = document.getElementById('cards-grid');
const overlay = document.querySelector('.overlay');
const newBookBtn = document.getElementById('add');
const newBookModal = document.getElementById('new-card-modal');
const modalMessage = document.getElementById('modal-message');
const form = document.getElementById('new-card-form');
const closeModalBtn = document.getElementById('close-modal');
const sidebar = document.getElementById('main-sidebar');
const sidebarHidden = document.getElementById('hidden-sidebar');

class Book {
  constructor(title='Default', author='Unknown', info='') {
    this.title = title;
    this.author = author;
    this.info = info;
  };
  set HTML(h) {
    this._html = h
  }
  toggleRead() {
    this._html.classList.toggle('read');
  }

};

const library = {
  books: [],

  displaybooks() {
    for (let book of library.books) {
      library.removeHTML(book);
      grid.appendChild(library.createHTML(book));
    };
  },

  store(book) {
    let titles = library.books.map(book => book.title);
    let info = library.books.map(book => book.info)
    if (book.title == false) book.title = 'Untitled Book';
    if (book.author == false) book.author = 'Unknown Author';
    else if (titles.indexOf(book.title) != -1) {
      return 'A book with that name already exists';
    }
    else if (info.indexOf(book.info) != -1) {
      return 'Book already exists';
    };
    library.books.push(book);
    return '';
  },

  createHTML(book) {
    bookHTML = document.createElement('div');
    book.HTML = bookHTML;
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
      library.books.splice(library.books.indexOf(book), 1);
      library.removeHTML(book);
      library.displaybooks();
    })
    bookDel.textContent = 'Delete';

    bookRead = document.createElement('div');
    bookRead.classList.add('card-read');
    bookInput = document.createElement('input');
    bookInput.addEventListener('click', (e) => {
      book.toggleRead();
    })
    bookInputText = document.createElement('p');
    bookInputText.textContent = 'Read';
    bookInput.type = 'checkbox';
    bookRead.appendChild(bookInput);
    bookRead.appendChild(bookInputText);

    bookFooter.appendChild(bookDel);
    bookFooter.appendChild(bookRead);

    bookHTML.appendChild(bookHeader);
    bookHTML.appendChild(bookContent);
    bookHTML.appendChild(bookFooter);

    return bookHTML;
  },

  removeHTML(book) {
    thisBook = document.getElementById(`${book.title}`);
    if (!thisBook) return;
    while (thisBook.hasChildNodes()) {
      thisBook.removeChild(thisBook.lastChild)
    };
    grid.removeChild(thisBook);
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
  let book = new Book(...formData.values());
  modalMessage.textContent = library.store(book);
  if (modalMessage.textContent == '') {
    newBookModal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
    form.reset();
    library.displaybooks();
  };
});

sidebarHidden.addEventListener('click', (e) => {
  sidebarHidden.textContent = sidebar.classList.contains('hidden') ? '-' : '+'
  sidebar.classList.toggle('hidden');
});