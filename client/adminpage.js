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
    document.getElementById('addBookForm').style.display = 'none';
    document.getElementById('shadowOverlay').style.display = 'none';
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
        bookElement.setAttribute('data-book-id', cur.bookID); // Set unique identifier
        bookElement.innerHTML = `
        <div class="book">
            <div class="book-container">
                <div class="book-content">
                    <img class="img-${index} slider-img" src="${cur.bookImage}" onclick="handleImageClick(${index})"/>
                </div>
                <div class="book-buttons">
                    <button class="edit-button" onclick="editBook(${cur.bookID})">Edit</button>
                    <button class="delete-button" onclick="confirmDelete(${cur.bookID})">Delete</button>
                </div>
            </div>
        </div>
        `;
        sliders.appendChild(bookElement);
    });
    scrollPerClick = document.querySelector(".img-1").clientWidth + ImagePadding;
}

function editBook(bookID) {
    // Redirect to adminbook.html with the bookID as a query parameter
    window.location.href = `adminbook.html?bookID=${bookID}`;
}

function confirmDelete(bookID) {
    const confirmation = confirm("Are you sure you want to delete? This action cannot be undone.");
    if (confirmation) {
        deleteBook(bookID);
    }
}

async function deleteBook(bookID) {
    try {
        const response = await fetch(`http://localhost:5263/api/Admin/DeleteBook/${bookID}`, {
            method: "DELETE"
        });

        if (response.ok) {
            console.log(`Book with ID ${bookID} deleted successfully`);
            displayNotification(`Book deleted successfully`, "success");
            removeBookFromDOM(bookID);
        } else {
            displayNotification(`Error deleting book with ID ${bookID}`, "error");
        }
    } catch (error) {
        displayNotification("Network Error", "error");
    }
}


function removeBookFromDOM(bookID) {
    const bookElement = document.querySelector(`.book[data-book-id="${bookID}"]`);
    if (bookElement) {
        bookElement.remove();
    }
}


function displayNotification(message, type) {
    const notificationDiv = document.createElement("div");
    notificationDiv.textContent = message;
    notificationDiv.className = type === "success" ? "notification success" : "notification error";
    document.body.insertBefore(notificationDiv, document.body.firstChild);

    setTimeout(() => {
        notificationDiv.remove();
    }, 4000);
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
            displayNotification("Book Added Successfully", "success");
            event.target.reset(); // Clear the form fields
        } else {
            console.error("Error in adding book");
            displayNotification("Error in adding book", "error");
        }
    } catch (error) {
        console.error("Network Error: ", error);
        displayNotification("Network Error", "error");
    }
});

function displayNotification(message, type) {
    const notificationDiv = document.createElement("div");
    notificationDiv.textContent = message;
    notificationDiv.className = type === "success" ? "notification success" : "notification error";
    document.body.appendChild(notificationDiv); // Append to the body

    // Optional: Style the notification for better visibility
    notificationDiv.style.position = 'fixed';
    notificationDiv.style.top = '10px';
    notificationDiv.style.right = '10px';
    notificationDiv.style.backgroundColor = type === "success" ? 'green' : 'red';
    notificationDiv.style.color = 'white';
    notificationDiv.style.padding = '10px';
    notificationDiv.style.borderRadius = '5px';
    notificationDiv.style.zIndex = '1000';

    setTimeout(() => {
        notificationDiv.remove();
    }, 4000); // Notification will disappear after 4 seconds
}

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('addBookForm').style.display = 'none';
    document.getElementById('shadowOverlay').style.display = 'none';
});

const addButton = document.querySelector('.addbookbtn');
addButton.addEventListener('click', function() {
    const addBookForm = document.getElementById('addBookForm');
    const isHidden = addBookForm.style.display === 'none';
    addBookForm.style.display = isHidden ? 'block' : 'none';
    document.getElementById('shadowOverlay').style.display = isHidden ? 'block' : 'none';
});