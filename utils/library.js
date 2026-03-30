const genID = function*(){
    let n = 0;
    let bookID;
    while(true){
        n++;
        bookID = "book-" + n;
        yield bookID;
    }
}()

export function Book(title,author,pages,read){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = genID.next().value;
}

const bookMap = new Map();

export function addBook(title,author,pages,read){
    const book = new Book(title,author,pages,read);
    bookMap.set(book.id, book);
}

export const delBook = Map.prototype.delete.bind(bookMap);

export const getBook = Map.prototype.get.bind(bookMap);

export const listBooks = Map.prototype.values.bind(bookMap);

addBook("The Great Gatsby", "F. Scott Fitzgerald",240,true);
addBook("Pride and Prejudice","Jane Austen",464, false);
addBook("The Stranger", "Albert Camus",152, true );