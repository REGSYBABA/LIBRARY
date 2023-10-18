// const closeNewBookButton = document.querySelector('.close-nav');
// const addNewBookButton = document.querySelector('.open-nav');
// const nav = document.querySelector('.side-modal');
// const submitBtn = document.querySelector('.submit-newbook');
// let libraryEl = document.querySelector('.book-grid');
// const closeBtn = document.querySelectorAll('.close-modal');
// const delBtn = document.getElementById('delete');
// let modalBookId; // Variable to store the book ID for deletion

// closeNewBookButton.addEventListener("click", () => {
//     nav.classList.remove('navigation-open');
// });

// addNewBookButton.addEventListener("click", () => {
//     nav.classList.add('navigation-open');
// });

// const showModal = (openButton, modalContent, bookId) => {
//     modalBookId = bookId; // Store the book ID
//     // Rest of the function remains the same...
// }

// document.getElementById('delete').addEventListener('click', () => {
//     confirmDelete(modalBookId);
// });

// function confirmDelete(bookId) {
//     const index = myLibrary.findIndex(book => book.id == bookId);
//     if (index !== -1) {
//         myLibrary.splice(index, 1);
//         render();
//         closeModal(); // Close the modal after deletion
//     }
// }

// function render() {
//     let libraryEl = document.querySelector('.book-grid');

//     libraryEl.innerHTML = "";

//     for (let i = 0; i < myLibrary.length; i++) {
//         let books = myLibrary[i];
//         let booksEl = document.createElement("div");
//         booksEl.setAttribute('data-number', books.id);
//         booksEl.classList.add('book-card');

//         booksEl.innerHTML =
//             `<div class="del-icon">
//                  <i class="material-icons">delete</i>
//              </div>
//              <div class="content">
//                  <h2 onclick="removeBook(${books.id})">Title: ${books.title}</h2>
//                  <h2>Author: ${books.author}</h2>
//                  <h2>Pages: ${books.pages}</h2>
//                  <h2>Language: ${books.language}</h2>
//              </div>
//              <div class="toggle-switch ${books.read ? 'read' : ''}" onclick="toggleRead(${i})">
//                  <span class="controller-text">${books.read ? 'Read:' : 'Not Read:'}</span>
//                  <div class="switch">
//                      <span class="controller"></span>
//                  </div>
//              </div>`;

//         libraryEl.appendChild(booksEl);
//     }

//     const deleteButtons = document.querySelectorAll('.del-icon .material-icons');
//     deleteButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             const bookId = button.parentElement.parentElement.dataset.number;
//             showModal('open-modal', 'modal-container', bookId);
//         });
//     });

//     closeBtn.forEach(closebutton => closebutton.addEventListener('click', closeModal));
// }

// // Add your Book constructor and other functions here...

// // Add your event listeners (e.g., submitBtn, delBtn) here...

// // Initialize your myLibrary array and render the initial state
// let myLibrary = [];
// render();

// Query Selectors
const body = document.querySelector('body');
const closeNewBookButton = document.querySelector('.close-nav');
const addNewBookButton = document.querySelector('.open-nav');
const nav = document.querySelector('.side-modal');
const submitBtn = document.querySelector('.submit-newbook');
let libraryEl = document.querySelector('.book-grid');
const closeBtn = document.querySelectorAll('.close-modal');
const delBtn = document.getElementById('delete');

// Event Listeners
closeNewBookButton.addEventListener("click", () => {
    nav.classList.remove('navigation-open');
});

addNewBookButton.addEventListener("click", () => {
    nav.classList.add('navigation-open');
});

closeBtn.forEach(closebutton => closebutton.addEventListener('click', closeModal));

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
});

delBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deleteSelectedBooks();
});

// Classes
function Book(title, author, pages, language, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.read = read;
    this.id = id;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

// Library Array
let myLibrary = [];

// Functions
function showModal(bookIndex) {
    const modalContainer = document.getElementById('delete-modal');
    if (modalContainer) {
        modalContainer.classList.add('show-modal');
        document.getElementById('delete').setAttribute('data-index', bookIndex);
    }
}

function closeModal() {
    const modalContainer = document.getElementById('delete-modal');
    modalContainer.classList.remove('show-modal');
}

function deleteBook(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    closeModal();
    render();
}

function deleteSelectedBooks() {
    const bookIndex = document.getElementById('delete').getAttribute('data-index');
    if (bookIndex !== null) {
        const index = parseInt(bookIndex, 10);
        deleteBook(index);
    }
}

function addBookToLibrary() {
    let title = document.querySelector('#book-title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#Pages').value;
    let language = document.querySelector('#lang').value;
    let read = document.querySelector('#is-read').checked;
    let id = myLibrary.length;
    let newBook = new Book(title, author, pages, language, read, id);
    myLibrary.push(newBook);
    render();
}

function render() {
    let libraryEl = document.querySelector('.book-grid');
    libraryEl.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        let books = myLibrary[i];
        let booksEl = createBookElement(books, i);
        libraryEl.appendChild(booksEl);
    }
}

function createBookElement(book, index) {
    let booksEl = document.createElement("div");
    booksEl.setAttribute('data-number', book.id);
    booksEl.classList.add('love');
    booksEl.innerHTML = `
        <div class="book-card ${book.read ? "read" : ""}">
            <div class="del-icon">
                <i class="material-icons mat" id='open-modal' onclick="showModal(${index})">delete</i>
            </div>
            <div class="content">
                <h2 onclick="removeBook(${book.id})">Title: ${book.title}</h2>
                <h2>Author: ${book.author}</h2>
                <h2>Pages: ${book.pages}</h2>
                <h2>Language: ${book.language}</h2>
            </div>
            <div class="toggle-switch ${book.read ? "read" : ""}" onclick="toggleRead(${index})">
                <span class="controller-text">${book.read ? "Read:" : "Not Read:"}</span>
                <div class="switch">
                    <span class="controller"></span>
                </div>
            </div>
        </div>`;
    return booksEl;
}

function toggleRead(index) {
    myLibrary[index].toggleRead();
    render();
}

function removeBook(id) {
    myLibrary = myLibrary.filter(book => book.id !== id);
    render();
}

//My first code before refactoring
// const body = document.querySelector('body')
// const closeNewBookButton = document.querySelector('.close-nav')
// const addNewBookButton = document.querySelector('.open-nav')
// const nav = document.querySelector('.side-modal')
// const submitBtn = document.querySelector('.submit-newbook')
// let libraryEl = document.querySelector('.book-grid')
// const closeBtn = document.querySelectorAll('.close-modal')
// const delBtn = document.getElementById('delete')


// closeNewBookButton.addEventListener("click", () => {
//     nav.classList.remove('navigation-open')
// })

// addNewBookButton.addEventListener("click", () => {
//     nav.classList.add('navigation-open')
// })


// const showModal = (openButton, modalContent, bookIndex) => {
//     const openBtn = document.getElementById(openButton),
//         modalContainer = document.getElementById(modalContent)

//     if (openBtn && modalContainer) {
//         modalContainer.classList.add('show-modal')
//         document.getElementById('delete').setAttribute('data-index', bookIndex);

//     }
// }

// function closeModal() {
//     const modalContainer = document.getElementById('modal-container')
//     modalContainer.classList.remove('show-modal')
// }

// closeBtn.forEach(closebutton => closebutton.addEventListener('click', closeModal))


// let myLibrary = [];

// function Book(title, author, pages, language, read, id) {
//     this.title = title
//     this.author = author
//     this.pages = pages
//     this.language = language
//     this.read = read
//     this.id = id
// }

// Book.prototype.toggleRead = function () {
//     this.read = !this.read
// }

// function toggleRead(index) {
//     myLibrary[index].toggleRead()
//     render()
// }

// function render() {

//     let libraryEl = document.querySelector('.book-grid')

//     libraryEl.innerHTML = ""
//     for (let i = 0; i < myLibrary.length; i++) {
//         let books = myLibrary[i]
//         let booksEl = document.createElement("div")
//         booksEl.setAttribute('data-number', books.id)
//         booksEl.classList.add('love')
//         booksEl.innerHTML =
//             `<div class = "book-card ${books.read ? "read" : " "}">
//                 <div class="del-icon">
//                 <i class="material-icons mat" id="open-modal" onclick="showModal('open-modal', 'modal-container', ${books.id})">delete</i>
//                 </div>

//                 <div class="content">
//                 <h2 onclick="removeBook(${books.id})">Title: ${books.title}</h2>
//                 <h2>Author: ${books.author}</h2>
//                 <h2>Pages: ${books.pages}</h2>
//                 <h2>Language: ${books.language}</h2>
//                 </div>

//                 <div class="toggle-switch ${books.read ? "read" : " "}" onclick="toggleRead(${i})">
//                 <span class="controller-text">${books.read ? "Read:" : "Not Read:"}</span>
//                 <div class="switch">
//                     <span class="controller"></span>
//                 </div>
//                 </div>
//             </div>`
//         libraryEl.appendChild(booksEl)
//         // onclick="showModal('open-modal', 'modal-container')" onclick="removeBook(${i})
//     }
// }

// function deleteBook() {
//     const bookIndex = document.getElementById('delete').getAttribute('data-index');
//     myLibrary.splice(bookIndex, 1);
//     closeModal();
//     render();
// }

// function addBookToLibrary() {
//     let title = document.querySelector('#book-title').value
//     let author = document.querySelector('#author').value
//     let pages = document.querySelector('#Pages').value
//     let language = document.querySelector('#lang').value
//     let read = document.querySelector('#is-read').checked
//     let id = myLibrary.length
//     let newBook = new Book(title, author, pages, language, read, id)
//     myLibrary.push(newBook)
//     console.log(myLibrary)
//     render()
// }

// submitBtn.addEventListener('click', function (e) {
//     e.preventDefault()
//     addBookToLibrary()
// })

// delBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     deleteBook();
// })

// const closeNewBookButton = document.querySelector('.close-nav')
// const addNewBookButton = document.querySelector('.open-nav')
// const nav = document.querySelector('.side-modal')
// const submitBtn = document.querySelector('.submit-newbook')
// let libraryEl = document.querySelector('.book-grid')
// const closeBtn = document.querySelectorAll('.close-modal')
// const delBtn = document.getElementById('delete')
// const form = document.getElementById('my-form')
// const bookTitle = document.getElementById('book-title')
// const author = document.getElementById('author')
// const numOfPages = document.getElementById('Pages')
// const language = document.getElementById('lang')
// const password = document.getElementById('password')
// const password2 = document.getElementById('confirmPassword')
// const btn = document.querySelector('button')

// //Event Listeners
// closeNewBookButton.addEventListener("click", () => {
//     nav.classList.remove('navigation-open')
// })

// addNewBookButton.addEventListener("click", () => {
//     nav.classList.add('navigation-open')
// })

// closeBtn.forEach(closebutton => closebutton.addEventListener('click', closeModal))

// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     validateInputs()
// })

// submitBtn.addEventListener('click', function (e) {
//     e.preventDefault()
//     if (validateInputs()) {
//         addBookToLibrary();
//     }
// })

// delBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     deleteBook();
// })


// // Library array
// let myLibrary = [];

// //classes
// class Book {
//     constructor (title, author, pages, language, read, id) {
//         this.title = title
//         this.author = author
//         this.pages = pages
//         this.language = language
//         this.read = read
//         this.id = id
//     }
//     toggleRead() {
//         this.read = !this.read
//     }
// }

// //Functions
// function addBookToLibrary() {
//     let title = document.querySelector('#book-title').value
//     let author = document.querySelector('#author').value
//     let pages = document.querySelector('#Pages').value
//     let language = document.querySelector('#lang').value
//     let read = document.querySelector('#is-read').checked
//     let id = myLibrary.length
//     let newBook = new Book(title, author, pages, language, read, id)
//     myLibrary.push(newBook)
//     console.log(myLibrary)
//     render()
// }

// function render() {
//     let libraryEl = document.querySelector('.book-grid');
//     libraryEl.innerHTML = "";
//     for (let i = 0; i < myLibrary.length; i++) {
//         let books = myLibrary[i];
//         let booksEl = createBookElement(books, i);
//         libraryEl.appendChild(booksEl);
//     }
// }

// function createBookElement(book, index) {
//     let booksEl = document.createElement("div");
//     booksEl.setAttribute('data-number', book.id);
//     booksEl.classList.add('love');
//     booksEl.innerHTML = `
//         <div class="book-card ${book.read ? "read" : ""}">
//             <div class="del-icon">
//             <i class="material-icons mat" id="open-modal" onclick="showModal('open-modal', 'modal-container', ${book.id})">delete</i>
//             </div>
//             <div class="content">
//                 <h2>Title: ${book.title}</h2>
//                 <h2>Author: ${book.author}</h2>
//                 <h2>Pages: ${book.pages}</h2>
//                 <h2>Language: ${book.language}</h2>
//             </div>
//             <div class="toggle-switch ${book.read ? "read" : ""}" onclick="toggleRead(${index})">
//                 <span class="controller-text">${book.read ? "Read:" : "Not Read:"}</span>
//                 <div class="switch">
//                     <span class="controller"></span>
//                 </div>
//             </div>
//         </div>`;
//     return booksEl;
// }

// function toggleRead(index) {
//     myLibrary[index].toggleRead()
//     render()
// }

// const showModal = (openButton, modalContent, bookIndex) => {
//     const openBtn = document.getElementById(openButton),
//         modalContainer = document.getElementById(modalContent)

//     if (openBtn && modalContainer) {
//         modalContainer.classList.add('show-modal')
//         document.getElementById('delete').setAttribute('data-index', bookIndex);

//     }
// }

// function closeModal() {
//     const modalContainer = document.getElementById('modal-container')
//     modalContainer.classList.remove('show-modal')
// }

// const setError = (element, message) => {
//     const inputs = element.parentElement
//     const errorDisplay = inputs.querySelector('.error')

//     errorDisplay.textContent = message
//     inputs.classList.add('error')
//     inputs.classList.remove('success')

// }

// const setSuccess = (element) => {
//     const inputs = element.parentElement
//     const errorDisplay = inputs.querySelector('.error')

//     errorDisplay.innerText = ''
//     inputs.classList.add('success')
//     inputs.classList.remove('error')
// }

// const validateInputs = () => {
//     const bookTitleVal = bookTitle.value.trim()
//     const authorVal = author.value.trim()
//     const numOfPagesVal = numOfPages.value.trim()
//     const languageVal = language.value.trim()

//     if (bookTitleVal === '') {
//         setError(bookTitle, "Book's name is required")
//         return false;
//     } else if (bookTitleVal.length < 4) {
//         setError(bookTitle, "Book's name should be more than 4")
//         return false;
//     } else if (/\d/.test(bookTitleVal)) {
//         setError(bookTitle, "Book's name can't contain a number");
//         return false;
//     } else {
//         setSuccess(bookTitle)
//     }

//     if (authorVal === '') {
//         setError(author, 'Last name is required')
//         return false;
//     } else {
//         setSuccess(author)
//     }

//     if (numOfPagesVal === '') {
//         setError(numOfPages, 'Number of pages is required')
//         return false;
//     } else {
//         setSuccess(numOfPages)
//     }

//     if (languageVal === '') {
//         setError(language, 'Language is Required')
//         return false;
//     } else {
//         setSuccess(language)
//     }

//     return true;
// }

// function deleteBook() {
//     const bookIndex = document.getElementById('delete').getAttribute('data-index');
//     myLibrary.splice(bookIndex, 1);
//     closeModal();
//     render();
// }