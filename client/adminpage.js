const sliders = document.querySelector(".carouselbox");
var scrollPerClick;
var ImagePadding = 20;
let BooksUnsort = [];
let Books = [];
let originalBooks = [];
let myBooks = [];
const url = "https://localhost:5263/api/Book";
function handleOnLoad() {
    fetchBooks();
    setupAddBookButton();
    document.getElementById('addBookForm').style.display = 'none';
    document.getElementById('shadowOverlay').style.display = 'none';
}
document.addEventListener("DOMContentLoaded", handleOnLoad);
document.querySelector('#editCloseButton').addEventListener('click', function() {
    const editBookForm = document.getElementById('editBookForm');
    editBookForm.style.display = 'none';
    document.getElementById('shadowOverlay').style.display = 'none';
});
document.querySelector('#editCloseButton').addEventListener('click', function() {
    const editBookForm = document.getElementById('editBookForm');
    editBookForm.style.display = 'none';
    document.getElementById('shadowOverlay').style.display = 'none';
});
document.querySelector('#editBookQuality').addEventListener('change', function() {
    const qualityDropdown = document.getElementById('editBookQuality');
    const selectedQuality = qualityDropdown.value;
    const priceInput = document.getElementById('editBookPrice');
    const quantityInput = document.getElementById('editBookQuantity');
    if (editedBook && editedBook.bookID && selectedQuality !== '') {
        priceInput.value = editedBook[`${selectedQuality}Price`]; // Update price for selected quality
        quantityInput.value = editedBook[`${selectedQuality}Quantity`]; // Update quantity for selected quality
    } else {
        priceInput.value = '';
        quantityInput.value = '';
    }
});
async function fetchBooks() {
    try {
 
        Books = await getBooks();
 
        originalBooks = [...Books];
 
        console.log('Fetched books:', Books);
 
        updateCarousel(Books);
 
    } catch (error) {
 
        console.error('Error fetching books:', error);
 
    }
 
}
 
async function fetchBookById(bookID) {
    try {
        let response = await fetch(`https://localhost:5263/api/Admin/Book/${bookID}`);
        let bookData = await response.json();
        return bookData;
    } catch (error) {
        console.error('Error fetching book:', error);
    }
}
 
 
function updateCarousel(books) {
    const carousel = document.querySelector('.carouselbox');
    carousel.innerHTML = '';
    books.forEach((book, index) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.setAttribute('data-book-id', book.bookID);
        bookElement.innerHTML = `
            <div class="book">
                <div class="book-container">
                    <div class="book-content">
                        <img class="img-${index} slider-img" src="${book.bookImage}" onclick="handleImageClick(${index})"/>
                    </div>
                    <div class="book-buttons">
                        <button class="edit-button" onclick="editBook(${book.bookID})">Edit</button>
                        <button class="delete-button" onclick="confirmDelete(${book.bookID})">Delete</button>
                    </div>
                </div>
            </div>
        `;
        carousel.appendChild(bookElement);
        calculateScrollAmount();
    });
}
function calculateScrollAmount() {
    const sampleItem = document.querySelector('.carousel .book');
    if (sampleItem) {
        scrollPerClick = sampleItem.clientWidth + ImagePadding;
    } else {
        console.error("No carousel items found for calculating scroll amount.");
    }
}
async function getBooks() {
    let response = await fetch(url);
    let books = await response.json();
    return books;
}
 
async function createScroll(Book) {
 
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
 
 
 
let currentNewPrice, currentGoodPrice, currentPoorPrice;
let currentNewQuantity, currentGoodQuantity, currentPoorQuantity;
 
async function editBook(bookID) {
    try {
        // Fetch the latest book data from the database
        const latestBookData = await fetchBookById(bookID);
        if (!latestBookData) {
            console.error('Book not found');
            return;
        }
 
        // Update editedBook with the latest data
        editedBook = latestBookData;
 
        // Update the global variables with the latest data
        currentNewPrice = editedBook.newPrice;
        currentGoodPrice = editedBook.goodPrice;
        currentPoorPrice = editedBook.poorPrice;
        currentNewQuantity = editedBook.newQuantity; // Update these values
        currentGoodQuantity = editedBook.goodQuantity;
        currentPoorQuantity = editedBook.poorQuantity;
 
        resetEditForm(); // Reset the form fields
 
        // Populate the form fields with the latest book data
        const editBookForm = document.getElementById('editBookForm');
        editBookForm.querySelector('#editBookTitle').value = editedBook.bookName;
        editBookForm.querySelector('#editBookAuthor').value = editedBook.bookAuthor;
        editBookForm.querySelector('#editBookGenre').value = editedBook.bookGenre;
        editBookForm.querySelector('#editBookDescription').value = editedBook.bookDescription;
        editBookForm.querySelector('#editBookImage').value = editedBook.bookImage;
 
        // Handle quality dropdown and price input
        updateQualityAndPriceInputs();
 
        // Display the edit form
        document.getElementById('editBookForm').style.display = 'block';
        document.getElementById('shadowOverlay').style.display = 'block';
    } catch (error) {
        console.error('Error editing book:', error);
        // Handle error appropriately
    }
}
 
function updateQualityAndPriceInputs() {
    const qualityDropdown = document.getElementById('editBookQuality');
    const priceInput = document.getElementById('editBookPrice');
    if (['new', 'good', 'poor'].includes(editedBook.bookQuality)) {
        qualityDropdown.value = editedBook.bookQuality;
        switch (editedBook.bookQuality) {
            case 'new':
                priceInput.value = editedBook.newPrice;
                break;
            case 'good':
                priceInput.value = editedBook.goodPrice;
                break;
            case 'poor':
                priceInput.value = editedBook.poorPrice;
                break;
        }
    } else {
        qualityDropdown.value = '';
        priceInput.value = '';
    }
}
 
 
 
 
function confirmDelete(bookID) {
 
    const confirmation = confirm("Are you sure you want to delete? This action cannot be undone.");
 
    if (confirmation) {
 
        deleteBook(bookID);
 
    }
 
}
 
async function deleteBook(bookID) {
 
    try {
 
        const response = await fetch(`https://localhost:5263/api/Admin/DeleteBook/${bookID}`, {
 
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
 
 
async function handleImageClick(index) {
    myBooks.push(Books[index]);
    localStorage.setItem('myBooks', JSON.stringify(Books[index]));
    window.location.replace("adminbook.html", "_blank");
 
}
 
document.querySelector('.scroll-left').addEventListener('click', scrollCarouselLeft);
document.querySelector('.scroll-right').addEventListener('click', scrollCarouselRight);
 
function scrollCarouselLeft() {
    // Scroll the carousel to the left
    const carousel = document.querySelector('.carousel');
    carousel.scrollBy({
        top: 0,
        left: -scrollPerClick,
        behavior: 'smooth'
    });
}
 
function scrollCarouselRight() {
    // Scroll the carousel to the right
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
 
        const response = await fetch("https://localhost:5263/api/Admin/AddBook", {
 
            method: "POST",
 
            headers: {
 
                'Content-Type': 'application/json'
 
            },
 
            body: JSON.stringify(bookData)
 
        });
 
        if (response.ok) {
 
            console.log("New book added successfully");
 
            displayNotification("Book Added Successfully", "success");
 
            // Close the add book form
 
            document.getElementById('addBookForm').style.display = 'none';
 
            document.getElementById('shadowOverlay').style.display = 'none';
 
            // Refresh the list of books and update the carousel
 
            await fetchBooks();
 
        } else {
 
            console.error("Book with the same name and author already exists.");
 
            displayNotification("Book with the same name and author already exists.", "error");
 
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
 
    document.body.appendChild(notificationDiv);
 
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
 
document.getElementById("editBookForm").addEventListener("submit", async function(event) {
 
    event.preventDefault();
 
    const selectedQuality = document.getElementById("editBookQuality").value;
 
    const selectedPrice = parseFloat(document.getElementById("editBookPrice").value);
 
    const selectedQuantity = parseInt(document.getElementById("editBookQuantity").value, 10);
 
 
    // Update the price for the selected quality
 
    switch (selectedQuality) {
        case 'new':
            currentNewPrice = selectedPrice;
            currentNewQuantity = selectedQuantity;
            break;
        case 'good':
            currentGoodPrice = selectedPrice;
            currentGoodQuantity = selectedQuantity;
            break;
        case 'poor':
            currentPoorPrice = selectedPrice;
            currentPoorQuantity = selectedQuantity;
            break;
        default:
            console.error("Invalid quality selected");
            return;
    }
 
    const updatedBook = {
 
        bookName: document.getElementById("editBookTitle").value,
 
        bookAuthor: document.getElementById("editBookAuthor").value,
 
        bookGenre: document.getElementById("editBookGenre").value,
 
        bookDescription: document.getElementById("editBookDescription").value,
 
        bookImage: document.getElementById("editBookImage").value,
 
        newPrice: currentNewPrice,
 
        goodPrice: currentGoodPrice,
 
        poorPrice: currentPoorPrice,
 
        newQuantity: currentNewQuantity,
 
        goodQuantity: currentGoodQuantity,
 
        poorQuantity: currentPoorQuantity
    };
    // Send PUT request to update book
    try {
        const response = await fetch(`https://localhost:5263/api/Admin/UpdateBookDetails/${editedBook.bookID}`, {
 
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });
        if (response.ok) {
            console.log("Book updated successfully");
            displayNotification("Book updated successfully", "success");
            // Close the edit form and clear editedBook
            document.getElementById('editBookForm').style.display = 'none';
            document.getElementById('shadowOverlay').style.display = 'none';
            editedBook = null;
        } else {
            console.error("Error in updating book");
            displayNotification("Error in updating book", "error");
        }
    } catch (error) {
        console.error("Network Error: ", error);
        displayNotification("Network Error", "error");
    }
});
document.querySelector('#editCloseButton').addEventListener('click', function() {
    const editBookForm = document.getElementById('editBookForm');
    editBookForm.style.display = 'none';
    document.getElementById('shadowOverlay').style.display = 'none';
    editedBook = null;
    resetEditForm();
});
function resetEditForm() {
    // Reset quantity and price fields
    document.getElementById('editBookPrice').value = '';
    document.getElementById('editBookQuantity').value = '';
    // Reset the quality dropdown to 'Select Quality'
    document.getElementById('editBookQuality').value = '';
}
 
function filterByOrder(order) {
    if (order === 'original') {
        Books = [...originalBooks];
    } else {
        Books = sortBooks(order);
    }
    updateCarousel(Books);
}
function sortBooks(order) {
    let sortedBooks = [...originalBooks];
    if (order === 'name') {
        sortedBooks.sort((a, b) => a.bookName.localeCompare(b.bookName));
    } else if (order === 'author') {
        sortedBooks.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
    }
    return sortedBooks;
}
 
function searchBooks() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredBooks = originalBooks.filter(book =>
        book.bookName.toLowerCase().includes(searchTerm) ||
        book.bookAuthor.toLowerCase().includes(searchTerm)
    );
    updateCarousel(filteredBooks);
}