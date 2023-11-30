const sliders = document.querySelector(".carouselbox")
var scrollPerClick
var ImagePadding = 20
let BooksUnsort = []
let Books = []
let myBooks = []
const url = "https://localhost:5263/api/Book"

async function handleOnLoad(){
    fetchBooks()
}

async function fetchBooks(){
    Books = await getBooks()
    console.log(Books)

    createScroll(Books)
}

async function getBooks(){
    let response = await fetch(url)
    let books = await response.json()

    return await books
}

async function createScroll(Book){
    sliders.innerHTML = '';

    Book.map(function(cur, index){
        sliders.insertAdjacentHTML(
            "beforeend",
            `<img class = "img-${index} slider-img" src="${cur.bookImage}" onclick="handleImageClick(${index})"/>`
        )
    })

    scrollPerClick = document.querySelector(".img-1").clientWidth + ImagePadding;
}

async function handleImageClick(index){
    myBooks.push(Books[index])
    localStorage.setItem('myBooks', JSON.stringify(Books[index]))
    window.location.replace("specificbook.html", "_blank")
}

function scrollCarouselLeft() {
    const carousel = document.querySelector('.carousel');
    carousel.scrollBy({
        top: 0,
        left: -scrollPerClick,
        behavior: 'smooth'
    });
}

function scrollCarouselRight() {
    const carousel = document.querySelector('.carousel');
    carousel.scrollBy({
        top: 0,
        left: scrollPerClick,
        behavior: 'smooth'
    });
}
function goToShoppingCartPage() {
    window.location.replace("shoppingcart.html", "_blank")
}

function goToShoppingCartPage() {
    window.location.replace("shoppingcart.html", "_blank")
}

function filterByOrder(order) {
    currentSortOrder = order;
    createScroll(sortBooks(order));
}

// Function to sort the books based on the current order
function sortBooks(order) {
    let sortedBooks = [...Books];

    switch (order) {
        case 'name':
            sortedBooks.sort((a, b) => a.bookName.localeCompare(b.bookName));
            break;
        case 'author':
            sortedBooks.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
            break;

        default:
            // Default case, no sorting
            break;
    }

    return sortedBooks;
}