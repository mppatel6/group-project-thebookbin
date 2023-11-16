const sliders = document.querySelector(".carouselbox")
var scrollPerClick
var ImagePadding = 20
let BooksUnsort = []
let Books = []
let myBooks = []
const url = "http://localhost:5263/api/Book"

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
