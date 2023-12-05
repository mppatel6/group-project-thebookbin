const sliders = document.querySelector(".carouselbox");
var scrollPerClick;
var ImagePadding = 20;
let Books = [];
let myBooks = [];
let ogBooks = [];
let originalBooks = [];
let filteredBooks = []; 
const url = "https://localhost:5263/api/Book";

async function handleOnLoad() {
    await fetchBooks();
}

async function fetchBooks() {
    try {
        Books = await getBooks();
        console.log('Fetched books:', Books);

        originalBooks = Books.map((book, index) => ({ ...book, originalIndex: index }));
        ogBooks = [...Books];
        createScroll(Books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

async function getBooks() {
    let response = await fetch(url);
    let books = await response.json();

    return books;
}

async function createScroll(Book) {
    sliders.innerHTML = '';

    Book.map(function (cur, index) {
        sliders.insertAdjacentHTML(
            "beforeend",
            `<img class="img-${index} slider-img" src="${cur.bookImage}" onclick="handleImageClick(${index})"/>`
        );
    });

    scrollPerClick = document.querySelector(".img-1").clientWidth + ImagePadding;
}

function searchBooks() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    filteredBooks = originalBooks
        .map((book, index) => ({ ...book, originalIndex: index }))
        .filter(book => 
            book.bookName.toLowerCase().includes(searchTerm) || 
            book.bookAuthor.toLowerCase().includes(searchTerm)
        );
    createScroll(filteredBooks);
}

async function handleImageClick(index) {
    const clickedBook = filteredBooks.length > 0 ? filteredBooks[index] : Books[index];
    myBooks.push(clickedBook);
    localStorage.setItem('myBooks', JSON.stringify(clickedBook));
    window.location.replace("specificbook.html", "_blank");
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
    window.location.replace("shoppingcart.html", "_blank");
}

function filterByOrder(order) {
    if (order === 'original') {
        Books = [...ogBooks]
    } else {
        currentSortOrder = order;
        Books = sortBooks(order);
    }
    createScroll(Books);
}

function sortBooks(order) {
    switch (order) {
        case 'name':
            Books.sort((a, b) => a.bookName.localeCompare(b.bookName));
            break;
        case 'author':
            Books.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
            break;
        default:
            Books = [...ogBooks];
            break;
    }

    return Books;
}
