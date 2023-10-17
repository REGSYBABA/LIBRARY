const closeNewBookButton = document.querySelector('.close-nav');
const addNewBookButton = document.querySelector('.open-nav');
const nav = document.querySelector('.side-modal');
const submitBtn = document.querySelector('.submit-newbook');
let libraryEl = document.querySelector('.book-grid');
const closeBtn = document.querySelectorAll('.close-modal');
const delBtn = document.getElementById('delete');
let modalBookId; // Variable to store the book ID for deletion

closeNewBookButton.addEventListener("click", () => {
    nav.classList.remove('navigation-open');
});

addNewBookButton.addEventListener("click", () => {
    nav.classList.add('navigation-open');
});

const showModal = (openButton, modalContent, bookId) => {
    modalBookId = bookId; // Store the book ID
    // Rest of the function remains the same...
}

document.getElementById('delete').addEventListener('click', () => {
    confirmDelete(modalBookId);
});

function confirmDelete(bookId) {
    const index = myLibrary.findIndex(book => book.id == bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        render();
        closeModal(); // Close the modal after deletion
    }
}

function render() {
    let libraryEl = document.querySelector('.book-grid');

    libraryEl.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        let books = myLibrary[i];
        let booksEl = document.createElement("div");
        booksEl.setAttribute('data-number', books.id);
        booksEl.classList.add('book-card');

        booksEl.innerHTML =
            `<div class="del-icon">
                 <i class="material-icons">delete</i>
             </div>
             <div class="content">
                 <h2 onclick="removeBook(${books.id})">Title: ${books.title}</h2>
                 <h2>Author: ${books.author}</h2>
                 <h2>Pages: ${books.pages}</h2>
                 <h2>Language: ${books.language}</h2>
             </div>
             <div class="toggle-switch ${books.read ? 'read' : ''}" onclick="toggleRead(${i})">
                 <span class="controller-text">${books.read ? 'Read:' : 'Not Read:'}</span>
                 <div class="switch">
                     <span class="controller"></span>
                 </div>
             </div>`;

        libraryEl.appendChild(booksEl);
    }

    const deleteButtons = document.querySelectorAll('.del-icon .material-icons');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bookId = button.parentElement.parentElement.dataset.number;
            showModal('open-modal', 'modal-container', bookId);
        });
    });

    closeBtn.forEach(closebutton => closebutton.addEventListener('click', closeModal));
}

// Add your Book constructor and other functions here...

// Add your event listeners (e.g., submitBtn, delBtn) here...

// Initialize your myLibrary array and render the initial state
let myLibrary = [];
render();
