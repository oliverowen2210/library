library = {
  storedBooks: [],

  storeBook(book) {
    library.storedBooks.push(book);
  },

  
  
}

function Book(title='Default', author='Unknown', pages=0, release='?', info='') {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.release = release;
  this.info = info;
};

Book.prototype.description = function() {
  return this.info;
};

