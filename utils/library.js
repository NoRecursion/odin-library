export const Book = (()=>{
    
    let idCount = 0 
    
    
    function genID(){
        return `book-${idCount++}`
    }
    
    
    function Book(title,author,pages,read){
        if (!new.target) {
            throw Error("You must use the 'new' operator to call the constructor");
        }
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = genID();
    }

    return Book;
})()


export const Library = (()=>{
    const p_bookMap = new WeakMap() 

    function Library(list){
        if (!new.target) {
            throw Error("You must use the 'new' operator to call the constructor");
        }

        p_bookMap.set(this, new Map());

        for (const [title, author, pages, read] of list) {
            this.addBook(title, author, pages, read);
        }
    }

    Library.prototype.addBook = function(title, author, pages, read){
        const book = new Book(title, author, pages, read);
        const bookMap = p_bookMap.get(this);
        bookMap.set(book.id, book);
    }

    Library.prototype.delBook = function(id) {
        const bookMap = p_bookMap.get(this);
        bookMap.delete(id);
    }

    Library.prototype.getBook = function(id) {
        const bookMap = p_bookMap.get(this);
        return bookMap.get(id);
    }

    Library.prototype.makeIterator = function() {
        const bookMap = p_bookMap.get(this);
        return bookMap.values();
    }

    Library.prototype.listBooks = function() {
        const bookMap = p_bookMap.get(this);
        return Array.from(bookMap.values());
    }
    
    Object.defineProperty(Library, 'basicBooks', {
        value:Object.freeze([
            ["The Great Gatsby", "F. Scott Fitzgerald", 240, true],
            ["Pride and Prejudice", "Jane Austen", 464, false],
            ["The Stranger", "Albert Camus", 152, true],
        ]),
        writable: false,
        configurable: false,
        enumerable: false,
    });

    return Library;
})()