const sliders = document.querySelector(".carouselbox");
var scrollPerClick;
var ImagePadding = 20;
let BooksUnsort = [];
let Books = [];
let myBooks = [];
const url = "http://localhost:5263/api/Book";

function handleOnLoad() {
    fetchBooks();
    setupAddBookButton();
}

document.addEventListener("DOMContentLoaded", handleOnLoad);

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
    const carousel = document.querySelector('.carousel');
    carousel.style.display = 'flex'; 
    Book.map(function(cur, index){
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
        <div class="book">
        <div class="book-container">
            <div class="book-content">
                <img class="img-${index} slider-img" src="${cur.bookImage}" onclick="handleImageClick(${index})"/>
            </div>
            <div class="book-buttons">
                <button class="edit-button" onclick="editBook(${cur.bookID})">Edit</button>
                <button class="delete-button" onclick="deleteBook(${cur.bookID})">Delete</button>
            </div>
        </div>
    </div>
    
        `;
        sliders.appendChild(bookElement);
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

document.getElementById("addBookForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const bookTitle = document.getElementById("bookTitle").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const bookGenre = document.getElementById("bookGenre").value;
    const bookQuality = document.getElementById("bookQuality").value;
    const bookDescription = document.getElementById("bookDescription").value;
    const bookImage = document.getElementById("bookImage").value;

    let newQuantity = 0, goodQuantity = 0, poorQuantity = 0;
    let newPrice = 0, goodPrice = 0, poorPrice = 0;
    const bookPrice = parseFloat(document.getElementById("bookPrice").value || 0);


    switch(bookQuality) {
        case "new":
            newQuantity = 1;
            newPrice = bookPrice;
            break;
        case "good":
            goodQuantity = 1;
            goodPrice = bookPrice;
            break;
        case "poor":
            poorQuantity = 1;
            poorPrice = bookPrice;
            break;
    }

    

    const bookData = {
        bookID: 0, 
        bookName: bookTitle,
        bookAuthor: bookAuthor,
        bookGenre: bookGenre,
        bookDescription: bookDescription,
        bookImage: bookImage,
        newQuantity: newQuantity,
        newPrice: newPrice,
        goodQuantity: goodQuantity,
        goodPrice: goodPrice,
        poorQuantity: poorQuantity,
        poorPrice: poorPrice,
        adminID: 1 
    };

    try {
        const response = await fetch("http://localhost:5263/api/Admin/AddBook", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        if (response.ok) {
            console.log("New book added successfully");
            displayMessage("Book Added Successfully", "success");
            event.target.reset(); 
        } else {
            console.error("Book with the same name and author already exists. Use edit function for further changes");
            displayMessage("Book with the same name and author already exists. Use edit function for further changes", "error");
        }
    } catch (error) {
        console.error("Error: ", error);
        displayMessage("Network Error", "error");
    }
});

function displayMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.className = type === "success" ? "alert alert-success" : "alert alert-danger";
    messageDiv.style.textAlign = 'center';

    const addBookForm = document.getElementById('addBookForm');
    addBookForm.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 4000);
}

