const sliders = document.querySelector(".carouselbox");
var scrollPerClick;
var ImagePadding = 20;
let BooksUnsort = [];
let Books = [];
let myBooks = [];
const url = "http://localhost:5263/api/Book";

document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
    setupAddBookButton();
});

async function fetchBooks(){
    Books = await getBooks();
    console.log(Books);
    createScroll(Books);
}

async function getBooks(){
    let response = await fetch(url);
    let books = await response.json();
    return books;
}

async function createScroll(Book){
    Book.map(function(cur, index){
        sliders.insertAdjacentHTML(
            "beforeend",
            `<img class="img-${index} slider-img" src="${cur.bookImage}" onclick="handleImageClick(${index})"/>`
        );
    });
    scrollPerClick = document.querySelector(".img-1").clientWidth + ImagePadding;
}

async function handleImageClick(index){
    myBooks.push(Books[index]);
    localStorage.setItem('myBooks', JSON.stringify(Books[index]));
    window.location.replace("adminbook.html", "_blank");
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

function setupAddBookButton() {
    const addButton = document.querySelector('.addbookbtn');
    const shadowOverlay = document.getElementById('shadowOverlay');
    const addBookForm = document.getElementById('addBookForm');

    addButton.addEventListener('click', function() {
        const isHidden = addBookForm.style.display === 'none';
        addBookForm.style.display = isHidden ? 'block' : 'none';
        shadowOverlay.style.display = isHidden ? 'block' : 'none';
    });
}

