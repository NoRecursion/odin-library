import * as library from "./utils/library.js";

const card_container = document.querySelector("#card-container");
const card_template = document.querySelector("#card-template");
const card_adder = document.querySelector("#add-card");

function createCard(book) {
    const card = card_template.content.cloneNode(true);

    card.querySelector(".title").textContent = book.title;
    card.querySelector(".author").textContent = book.author;
    card.querySelector(".page-count").textContent = book.pages;
  
    const status = card.querySelector(".status");
    status.classList.toggle("read", book.read);

    status.onclick = (e)=>{
        book.read = !book.read;
        e.target.classList.toggle("read", book.read);
    }

    card.id = book.id;

    card.querySelector(".close").onclick = (e)=>{
        library.delBook(book.id);
        displayCards();
    }

    return card;
}

function displayCards(){
    card_container.replaceChildren();
    for (const book of library.listBooks()){
        const card = createCard(book);
        card_container.appendChild(card);
        
    }
    card_container.appendChild(card_adder);
}

displayCards()

for (const book in library.listBooks()){
    console.log(book);
}
