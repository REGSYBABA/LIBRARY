const closeButton = document.querySelector('.close-nav')
const openButton = document.querySelector('.open-nav')
const nav = document.querySelector('.side-modal')

closeButton.addEventListener("click", () => {
    nav.classList.remove('navigation-open')
})

openButton.addEventListener("click", () => {
    nav.classList.add('navigation-open')
})

console.log('hi')
function Book(title){
    this.title = title;
}
console.log(Book)
function add(){
    let title = "Love is Blind"
    let newBook = new Book (title)
    console.log(newBook)
}

add()
let newBook = new Book ('blue')
console.log(newBook)