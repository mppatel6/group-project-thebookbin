
const curl = "https://localhost:5263/api/Customer";

function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}


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


const tradeInContainer = document.getElementById('tradeInContainer');
const loginMessage = document.getElementById('loginMessage');

if (isLoggedIn()) {
    tradeInContainer.style.display = 'block';
} else {
    loginMessage.textContent = "Sorry, you cannot use the trade-in function until you have logged in.";
}


document.getElementById("tradeInForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!isLoggedIn()) {
        displayMessage("Please log in to use this function", "error");
        return;
    }

    
    const bookTitle = document.getElementById("bookTitle").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const bookGenre = document.getElementById("bookGenre").value;
    const bookQuality = document.getElementById("bookQuality").value;
    const custEmail = document.getElementById("email").value;

    const bookDescription = "User trade-in";
    const bookImage = "./path/to/default/image.jpg"; 

    let newQuantity = 0, goodQuantity = 0, poorQuantity = 0;
    let newPrice = 0, goodPrice = 0, poorPrice = 0, tokens = 0;

    switch(bookQuality) {
        case "new":
            newQuantity = 1;
            newPrice = 10;
            tokens = 10;
            break;
        case "good":
            goodQuantity = 1;
            goodPrice = 5;
            tokens = 5;
            break;
        case "poor":
            poorQuantity = 1;
            poorPrice = 2;
            tokens = 2;
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
        const response = await fetch("https://localhost:5263/api/TradeIn", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        if(response.ok){
            console.log("Book trade-in submitted successfully");
            
            let Customers = []
            Customers = await getCustomers()
            console.log(Customers)
            const foundCustomer = Customers.find(customer => customer.customerEmail === custEmail);
            console.log(foundCustomer)

            foundCustomer.customerTokenAmount += tokens;

            const custData = {
                cid: foundCustomer.cid,
                customerEmail: foundCustomer.customerEmail,
                customerPassword: foundCustomer.customerPassword,
                customerTokenAmount: foundCustomer.customerTokenAmount
            }
            
            await fetch(curl, {
                method: "PUT",
                body: JSON.stringify(custData),
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                } 
            })

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

async function getCustomers(){
    let response = await fetch(curl)
    let customers = await response.json()

    return await customers
}
