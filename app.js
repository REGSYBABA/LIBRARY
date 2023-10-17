const body = document.querySelector('body')
const closeNewBookButton = document.querySelector('.close-nav')
const addNewBookButton = document.querySelector('.open-nav')
const nav = document.querySelector('.side-modal')
const submitBtn = document.querySelector('.submit-newbook')
let libraryEl = document.querySelector('.book-grid')
const closeBtn = document.querySelectorAll('.close-modal')
const delBtn = document.getElementById('delete')


closeNewBookButton.addEventListener("click", () => {
    nav.classList.remove('navigation-open')
})

addNewBookButton.addEventListener("click", () => {
    nav.classList.add('navigation-open')
})


const showModal = (openButton, modalContent, bookIndex) => {
    const openBtn = document.getElementById(openButton),
        modalContainer = document.getElementById(modalContent)

    if (openBtn && modalContainer) {
        modalContainer.classList.add('show-modal')
        document.getElementById('delete').setAttribute('data-index', bookIndex);

    }
}

function closeModal() {
    const modalContainer = document.getElementById('modal-container')
    modalContainer.classList.remove('show-modal')
}

closeBtn.forEach(closebutton => closebutton.addEventListener('click', closeModal))


let myLibrary = [];

function Book(title, author, pages, language, read, id) {
    this.title = title
    this.author = author
    this.pages = pages
    this.language = language
    this.read = read
    this.id = id
}

Book.prototype.toggleRead = function () {
    this.read = !this.read
}

function toggleRead(index) {
    myLibrary[index].toggleRead()
    render()
}

function render() {

    let libraryEl = document.querySelector('.book-grid')

    libraryEl.innerHTML = ""
    for (let i = 0; i < myLibrary.length; i++) {
        let books = myLibrary[i]
        let booksEl = document.createElement("div")
        booksEl.setAttribute('data-number', books.id)
        booksEl.classList.add('love')
        booksEl.innerHTML =
            `<div class = "book-card ${books.read ? "read" : " "}">
                <div class="del-icon">
                <i class="material-icons mat" id="open-modal" onclick="showModal('open-modal', 'modal-container', ${books.id})">delete</i>
                </div>

                <div class="content">
                <h2 onclick="removeBook(${books.id})">Title: ${books.title}</h2>
                <h2>Author: ${books.author}</h2>
                <h2>Pages: ${books.pages}</h2>
                <h2>Language: ${books.language}</h2>
                </div>

                <div class="toggle-switch ${books.read ? "read" : " "}" onclick="toggleRead(${i})">
                <span class="controller-text">${books.read ? "Read:" : "Not Read:"}</span>
                <div class="switch">
                    <span class="controller"></span>
                </div>
                </div>
            </div>`
        libraryEl.appendChild(booksEl)
        // onclick="showModal('open-modal', 'modal-container')" onclick="removeBook(${i})
    }
}

function deleteBook() {
    const bookIndex = document.getElementById('delete').getAttribute('data-index');
    myLibrary.splice(bookIndex, 1);
    closeModal();
    render();
}

function addBookToLibrary() {
    let title = document.querySelector('#book-title').value
    let author = document.querySelector('#author').value
    let pages = document.querySelector('#Pages').value
    let language = document.querySelector('#lang').value
    let read = document.querySelector('#is-read').checked
    let id = myLibrary.length
    let newBook = new Book(title, author, pages, language, read, id)
    myLibrary.push(newBook)
    console.log(myLibrary)
    render()
}

submitBtn.addEventListener('click', function (e) {
    e.preventDefault()
    addBookToLibrary()
})

delBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deleteBook();
})