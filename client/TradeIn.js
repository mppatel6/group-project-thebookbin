// Function to check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Function to display a message
function displayMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.className = type === "success" ? "alert alert-success" : "alert alert-danger";
    messageDiv.style.textAlign = 'center';
    document.body.appendChild(messageDiv);
    setTimeout(() => {
        messageDiv.remove();
    }, 4000);
}

// Check if the user is logged in and display the trade-in form accordingly
const tradeInContainer = document.getElementById('tradeInContainer');
const loginMessage = document.getElementById('loginMessage');

if (isLoggedIn()) {
    tradeInContainer.style.display = 'block';
} else {
    loginMessage.textContent = "Sorry, you cannot use the trade-in function until you have logged in.";
}

// Event listener for the trade-in form
document.getElementById("tradeInForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!isLoggedIn()) {
        // Display a message to log in first
        displayMessage("Please log in to use this function", "error");
        return;
    }

    // Your existing trade-in form submission logic
    const bookTitle = document.getElementById("bookTitle").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const bookGenre = document.getElementById("bookGenre").value;
    const bookQuality = document.getElementById("bookQuality").value;

    const bookDescription = "User trade-in";
    const bookImage = "./path/to/default/image.jpg"; 

    let newQuantity = 0, goodQuantity = 0, poorQuantity = 0;
    let newPrice = 0, goodPrice = 0, poorPrice = 0;

    switch(bookQuality) {
        case "new":
            newQuantity = 1;
            newPrice = 10; 
            break;
        case "good":
            goodQuantity = 1;
            goodPrice = 5; 
            break;
        case "poor":
            poorQuantity = 1;
            poorPrice = 2; 
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
        const response = await fetch("http://localhost:5263/api/TradeIn", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        if(response.ok){
            console.log("Book trade-in submitted successfully");

            event.target.reset();

            displayMessage("Trade-In Approved", "success");
        } else {
            console.error("Failed to submit book trade-in");
            displayMessage("Failed to submit trade-in", "error");
        }
    } catch (error) {
        console.error("Error: ", error);
        displayMessage("Network error", "error");
    }
});
