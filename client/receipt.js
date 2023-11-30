let shoppingCart = []
let conditions = []
let Orders = []
let Books = []

const burl = "https://localhost:5263/api/Book"
const ourl = "https://localhost:5263/api/Orders"

shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
conditions = JSON.parse(localStorage.getItem('conditions'));

console.log(shoppingCart);
console.log(conditions);

async function handleOnLoad() {
    await fetchOrders();
    await fetchBooks();

    // Populate the receipt information
    populateReceipt();
    editBooks();
}

async function fetchOrders(){
    Orders = await getOrders()
    console.log(Orders)
}

async function fetchBooks(){
    Books = await getBooks()
    console.log(Books)
}

async function getOrders(){
    let response = await fetch(ourl)
    let orders = await response.json()

    return await orders
}

async function getBooks(){
    let response = await fetch(burl)
    let books = await response.json()

    return await books
}

// ... (your existing code)

function populateReceipt() {
    // Assuming the latest order is the last one in the array
    const lastOrder = Orders[Orders.length - 1];

    // Display customer information
    document.getElementById('customerEmail').innerText = lastOrder.customerEmail;
    document.getElementById('customerFName').innerText = lastOrder.customerFName;
    document.getElementById('customerLName').innerText = lastOrder.customerLName;
    document.getElementById('customerAddress').innerText = lastOrder.customerAddress;
    document.getElementById('country').innerText = lastOrder.country;
    document.getElementById('state').innerText = lastOrder.state;
    document.getElementById('zipcode').innerText = lastOrder.zipcode;

    // Display books in shopping cart
    const booksList = document.getElementById('booksList');
    let totalPrice = 0; // Initialize total price

    booksList.innerHTML = ''; // Clear previous content

    if (shoppingCart.length > 0) {
        shoppingCart.forEach((book, index) => {
            const condition = conditions[index]; // Assuming conditions are in sync with shoppingCart
            let li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-condensed');

            li.innerHTML = `
            <div class="d-flex">
            <img src="${book.bookImage}" alt="${book.bookName}" style="width: 100px; height: 120px; margin-right: 10px;">
            <div>
                <h6 class="my-0">${book.bookName}</h6>
                <small class="text-muted">${book.bookAuthor}</small>
                <p>Condition: ${condition}</p>
                <p>Price: ${getBookPrice(book, condition)}</p>
            </div>
        </div>
            `;

            booksList.appendChild(li);

            // Calculate and add the price to the total
            totalPrice += calculatePrice(book, condition);
        });

        // Display total price
        booksList.innerHTML += `<li class="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>$${totalPrice.toFixed(2)}</strong>
        </li>`;
    } else {
        // Display a message if the cart is empty
        booksList.innerHTML = '<li class="list-group-item">Your shopping cart is empty.</li>';
    }
}


function getBookPrice(book, condition) {
    // Determine the price based on the condition
    switch (condition) {
        case 'NEW':
            return `$${book.newPrice}`;
        case 'GOOD':
            return `$${book.goodPrice}`;
        case 'POOR':
            return `$${book.poorPrice}`;
        default:
            return 'Unknown';
    }
}

function calculatePrice(book, condition) {
    switch (condition) {
        case 'NEW':
            return book.newPrice;
        case 'GOOD':
            return book.goodPrice;
        case 'POOR':
            return book.poorPrice;
        default:
            return 0; // or throw an error for unknown condition
    }
}

async function editBooks() {
    console.log(Books);

    async function updateBooks() {
        for (let i = 0; i < shoppingCart.length; i++) {
            const cartItem = shoppingCart[i];
            const condition = conditions[i]; // Get the condition from the array

            // Find the corresponding book in the Books array
            const matchingBook = Books.find((book) => book.bookID === cartItem.bookID);
            
            if (matchingBook) {
                // Update the quantity based on the condition
                switch (condition) {
                    case 'NEW':
                        matchingBook.newQuantity -= 1;
                        break;
                    case 'GOOD':
                        matchingBook.goodQuantity -= 1;
                        break;
                    case 'POOR':
                        matchingBook.poorQuantity -= 1;
                        break;
                    default:
                        break;
                }
            }

            console.log(matchingBook);

            await fetch(burl, {
                method: "PUT",
                body: JSON.stringify(matchingBook),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
        }
    }

    await updateBooks(); // Invoke the inner function
}



