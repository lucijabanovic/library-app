const myLibrary = [];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
    let id = crypto.randomUUID();
    let book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
}

let dialog = document.querySelector("#dialog");
let addBtn = document.querySelector("#add");
let htmlPage = document.querySelector("html");

addBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    dialog.classList.toggle("show");
});

addBtn.addEventListener("mousedown", () => {
    addBtn.classList.add("clicked");
});

addBtn.addEventListener("mouseup", () => {
    addBtn.classList.remove("clicked");
});

htmlPage.addEventListener("click", (e) => {
    if (!dialog.contains(e.target) && dialog.classList.contains("show")) {
        dialog.classList.remove("show");
    }
});

let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pageNum = document.querySelector("#pages");
let read = document.querySelector("#read-check");
let submit = document.querySelector("#submit");
let books = document.querySelector("#books");

function displayPages() {
    books.replaceChildren();
    for (let i = myLibrary.length - 1; i > -1; i--) {
        let book = document.createElement("div");
        book.setAttribute("data-id", myLibrary[i].id);
        book.classList.add("book");
        books.appendChild(book);

        let bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
        book.appendChild(bookInfo);

        let head1 = document.createElement("h1");
        let head2 = document.createElement("h2");
        let head3 = document.createElement("h3");
        head1.textContent = myLibrary[i].title;
        head2.textContent = myLibrary[i].author;
        head3.textContent = `${myLibrary[i].pages} pages`;
        bookInfo.appendChild(head1);
        bookInfo.appendChild(head2);
        bookInfo.appendChild(head3);

        let status = document.createElement("div");
        status.classList.add("status");
        let label = document.createElement("span");
        let checkbox = document.createElement("input")
        checkbox.type = "checkbox";

        checkbox.addEventListener("change", () => {
            if (label.textContent == 'Read') {
                label.textContent = 'Not read';
            } else {
                label.textContent = 'Read';
            }
        });
        
        if (myLibrary[i].read) {
            label.textContent = 'Read';
            checkbox.checked = true;
        } else {
            label.textContent = 'Not read';
            checkbox.checked = false;
        }

        status.appendChild(label);
        status.appendChild(checkbox);
        book.appendChild(status);

        let close = document.createElement("img");
        close.src = 'images/close.svg';
        close.classList.add("close");
        book.appendChild(close);

        close.addEventListener("click", () => {
            let index = myLibrary.findIndex(Book => Book.id == book.getAttribute("data-id"));
            myLibrary.splice(index, 1);
            displayPages();
        });
    }
}

submit.addEventListener("click", () => {
    if (title.value != '' && author.value != '' && pageNum.value != '') {
        addBookToLibrary(title.value, author.value, pageNum.value, read.checked)
        title.value = '';
        author.value = '';
        pageNum.value = '';
        read.checked = false;
        dialog.classList.remove("show");

        displayPages();
    }
});
