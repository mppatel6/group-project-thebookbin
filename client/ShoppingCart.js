let shoppingCart = [];
let conditions = [];
let Customers = [];
const url = "https://localhost:5263/api/Customer"
const ourl = "https://localhost:5263/api/Orders"
const odurl = "https://localhost:5263/api/OrderDetails"


shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
conditions = JSON.parse(localStorage.getItem('conditions'));

console.log(shoppingCart);
console.log(conditions);

async function handleOnLoad() {
    fetchCustomers()
    displayCartDetails();
}

async function fetchCustomers(){
    Customers = await getCustomers()
    console.log(Customers)

}

async function getCustomers(){
    let response = await fetch(url)
    let customers = await response.json()

    return await customers
}


async function displayCartDetails() {
    let cartItemsList = document.getElementById('cartItemsList');
    let cartItemCount = document.getElementById('cartItemCount');
    let totalPrice = 0; // Initialize total price

    cartItemsList.innerHTML = ''; // Clear previous content

    if (shoppingCart.length > 0) {
        shoppingCart.forEach((book, index) => {
            let listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-condensed');

            listItem.innerHTML = `
                <div>
                    <h6 class="my-0">${book.bookName}</h6>
                    <small class="text-muted">${book.bookAuthor}</small>
                    <p>Condition: ${conditions[index]}</p>
                    ${
                        conditions[index] === 'NEW' ? `<p>Price: ${book.newPrice}</p>` :
                        conditions[index] === 'GOOD' ? `<p>Price: ${book.goodPrice}</p>` :
                        conditions[index] === 'POOR' ? `<p>Price: ${book.poorPrice}</p>` : ''
                    }
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeBook(${index})">Remove</button>
            `;

            cartItemsList.appendChild(listItem);

            // Calculate and add the price to the total
            totalPrice += calculatePrice(book, conditions[index]);
        });

        cartItemCount.textContent = shoppingCart.length; // Update the cart item count

        // Display total price
        cartItemsList.innerHTML += `<li class="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>$${totalPrice.toFixed(2)}</strong>
        </li>`;
    } else {
        // Display a message if the cart is empty
        cartItemsList.innerHTML = '<li class="list-group-item">Your shopping cart is empty.</li>';
        cartItemCount.textContent = '0';
    }
}

function removeBook(index) {
    // Remove the book at the specified index
    shoppingCart.splice(index, 1);

    // Remove the corresponding condition at the specified index
    conditions.splice(index, 1);

    // Save the updated cart and conditions to local storage
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    localStorage.setItem('conditions', JSON.stringify(conditions));

    // Redisplay the cart
    displayCartDetails();
}

// Function to calculate the price based on condition
function calculatePrice(book, condition) {
    if (condition === 'NEW') {
        return book.newPrice;
    } else if (condition === 'GOOD') {
        return book.goodPrice;
    } else if (condition === 'POOR') {
        return book.poorPrice;
    } else {
        return 0;
    }
}

async function checkout() {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let country = document.getElementById('country').value;
    let state = document.getElementById('state').value;
    let zip = document.getElementById('zip').value;

    // Create the order object
    let order = {
        OrderID: 0, // Let the server handle the auto-increment
        CID: null,
        CustomerEmail: email,
        CustomerFName: firstName,
        CustomerLName: lastName,
        CustomerAddress: address,
        Country: country,
        State: state,
        Zipcode: zip
    };

    for (let i = 0; i < Customers.length; i++) {
        console.log(Customers[i])
        if (Customers[i].customerEmail === email) {
            order.CID = Customers[i].cid
        }
    }

    

    await fetch(ourl, {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async function() {
        // Iterate through each book in the shopping cart and create an order detail
        for (let i = 0; i < shoppingCart.length; i++) {
            console.log(shoppingCart)
            let book = shoppingCart[i];
    
            let orderDetail = {
                OrderDetailID: 0, // Let the server handle the auto-increment
                OrderID: 0, // Use the OrderID from the created order
                BookID: book.bookID, // Replace BookID with the correct property from your book object
            };
            
            console.log(orderDetail)
            // Make a POST request to create the order detail
            await fetch(odurl, {
                method: "POST",
                body: JSON.stringify(orderDetail),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        }
    });

    window.location.href = 'receipt.html';
}