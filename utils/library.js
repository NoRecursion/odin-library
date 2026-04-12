export class Book {
    title;
    author;
    pages;
    read;
    static #idCount = 0;
    id;
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = Book.#genID();
    }
    static #genID() {
        return `book-${this.#idCount++}`;
    }
}
export class Library {
    #bookMap;
    static basicBooks = [
        ["The Great Gatsby", "F. Scott Fitzgerald", 240, true],
        ["Pride and Prejudice", "Jane Austen", 464, false],
        ["The Stranger", "Albert Camus", 152, true],
    ];
    constructor(list) {
        this.#bookMap = new Map();
        for (const [title, author, pages, read] of list) {
            this.addBook(title, author, pages, read);
        }
    }
    addBook(title, author, pages, read) {
        const book = new Book(title, author, pages, read);
        this.#bookMap.set(book.id, book);
    }
    delBook(id) {
        this.#bookMap.delete(id);
    }
    getBook(id) {
        return this.#bookMap.get(id);
    }
    makeIterator() {
        return this.#bookMap.values();
    }
    listBooks() {
        return Array.from(this.#bookMap.values());
    }
}
