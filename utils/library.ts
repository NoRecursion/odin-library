export type BookEntry = [title: string, author: string, pages: number, read: boolean];

export class Book{
    static #idCount:number=0;
    readonly id:string;
    constructor(
        public title: string,
        public author: string,
        public pages: number,
        public read: boolean
      ){
        this.id = Book.#genID();
    }

    static #genID():string{
        return `book-${this.#idCount++}`;
    }
}

export class Library{

    #bookMap:Map<string,Book>;

    static readonly basicBooks:BookEntry[] = [
        ["The Great Gatsby", "F. Scott Fitzgerald",240,true],
        ["Pride and Prejudice","Jane Austen",464, false],
        ["The Stranger", "Albert Camus",152, true],
    ];

    constructor(list:BookEntry[]){
        this.#bookMap = new Map();

        for(const [title,author,pages,read] of list){
            this.addBook(title,author,pages,read);
        }
    }

    addBook(title:string,author:string,pages:number,read:boolean):void{
        const book = new Book(title,author,pages,read);
        this.#bookMap.set(book.id, book);
    }

    delBook(id:string):void{
        this.#bookMap.delete(id);
    }

    getBook(id:string):Book|undefined{
        return this.#bookMap.get(id);
    }

    makeIterator():MapIterator<Book>{
        return this.#bookMap.values();
    }

    listBooks():Book[]{
        return Array.from(this.#bookMap.values());
    }
}