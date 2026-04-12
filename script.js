import {Library} from "./utils/library.js";

const lib = new Library(Library.basicBooks);

const card_container = document.querySelector("#card-container");
const card_template = document.querySelector("#card-template");
const card_adder = document.querySelector("#add-card");
const dialog = card_adder.querySelector("dialog");
const add_form = dialog.querySelector("form")


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
        lib.delBook(book.id);
        displayCards();
    }

    return card;
}

function displayCards(){
    card_container.replaceChildren();
    for (const book of lib.makeIterator()){
        const card = createCard(book);
        card_container.appendChild(card);
        
    }
    card_container.appendChild(card_adder);
}


card_adder.querySelector(".add-card-btn").onclick = ()=>{dialog.show()}
card_adder.querySelector(".close").onclick = ()=>{dialog.close(); add_form.reset();}

add_form.addEventListener("submit", (e)=>{
    const data = new FormData(add_form);
    lib.addBook(data.get("title"),data.get("author"),data.get("pages"),data.get("read") === "on");
    add_form.reset();
    displayCards();
})

displayCards();