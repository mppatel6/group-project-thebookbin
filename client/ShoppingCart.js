let shoppingCart = [];
let conditions = [];
let Customers = [];
const url = "http://localhost:5263/api/Customer"
const ourl = "http://localhost:5263/api/Orders"
const odurl = "http://localhost:5263/api/OrderDetails"


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

// Function to remove a book from the cart
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

async function checkout(){
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const country = document.getElementById("country").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;

    const order = {
        orderID: 0, // Assuming you may want to set this on the server or based on some logic
        cid: null, // Set to null for now, you may assign a value based on your logic
        customerEmail: email,
        customerFName: firstName,
        customerLName: lastName,
        customerAddress: address,
        country: country,
        state: state,
        zipcode: zip,
    };

    const foundCustomer = Customers.find(customer => customer.customerEmail === order.customerEmail);
    if (foundCustomer) {
        order.cid = foundCustomer.cid;
    }
    console.log(order)
    debugger
    try {
        const orderdata = JSON.stringify(order)
        const byteLength = new TextEncoder().encode(orderdata).length
        const response = await fetch(ourl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': byteLength.toString(),
            },
            body: orderdata,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        // Handle the response data if needed
        console.log('Order created successfully:', responseData);
        debugger
    } catch (error) {
        // Handle errors here
        console.log('Error creating order:', error);
        debugger
    }
    debugger
}

// async function checkout() {
//     const apiUrl = 'http://localhost:5263/api/Orders';

// // const postData = {
// //   orderID: 1,
// //   cid: 1,
// //   customerEmail: document.getElementById('email').value,
// //   customerFName: document.getElementById('firstName').value,
// //   customerLName: document.getElementById('lastName').value,
// //   customerAddress: document.getElementById('address').value,
// //   country: document.getElementById('country').value,
// //   state: document.getElementById('state').value,
// //   zipcode: document.getElementById('zip').value,
// // };

// // const postData = 
// // {
// //     orderID: 1,
// //     cid: 1,
// //     customerEmail: "manav@email.com",
// //     customerFName: "Manav222222",
// //     customerLName: "Patel",
// //     customerAddress: "4225 US Highway 231",
// //     country: "USA",
// //     state: "Alabama",
// //     zipcode: "36093"
// //   }
// //   console.log(postData)
// // console.log(document.getElementById('email').value)
// // console.log(document.getElementById('firstName').value)
// // console.log(document.getElementById('lastName').value)
// // console.log(document.getElementById('address').value)
// // console.log(document.getElementById('country').value)
// // console.log(document.getElementById('state').value)
// // console.log(document.getElementById('zip').value)
// // debugger

// // for (let i = 0; i < Customers.length; i++) {
// //     if (Customers[i].customerEmail === postData.customerEmail) {
// //         postData.cid = Customers[i].cid;

// //     }else[
// //         postData.cid = 1
// //     ]

// // }


// fetch(apiUrl, {
//   method: 'POST',
//   headers: {
//     'Accept': '*/*',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(postData)
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Handle the response data here
//     console.log('Response:', data);
//   })
//   .catch(error => {
//     // Handle errors here
//     console.error('Error:', error);
//   });

    
//     // let firstName = document.getElementById('firstName').value;
//     // let lastName = document.getElementById('lastName').value;
//     // let email = document.getElementById('email').value;
//     // let address = document.getElementById('address').value;
//     // let country = document.getElementById('country').value;
//     // let state = document.getElementById('state').value;
//     // let zip = document.getElementById('zip').value;


//     // let order = {
//     //     orderID: 0, 
//     //     cid: null,
//     //     customerEmail: email,
//     //     customerFName: firstName,
//     //     customerLName: lastName,
//     //     customerAddress: address,
//     //     country: country,
//     //     state: state,
//     //     zipcode: zip
//     // };


//     // let order1 = {
//     //     "orderID": 1,
//     //     "cid": 1,
//     //     "customerEmail": "manav@email.com",
//     //     "customerFName": "Manav",
//     //     "customerLName": "Patel",
//     //     "customerAddress": "4225 US Highway 231",
//     //     "country": "USA",
//     //     "state": "Alabama",
//     //     "zipcode": "36093"
//     //   }



//     // console.log(order1)
//     // debugger

    

//     // console.log(order.cid)
    
//     // await fetch(ourl, {
//     //     method: "POST",
//     //     headers: {
//     //         accept: "/",
//     //         "Content-type": "application/json"
//     //     },
//     //     body: JSON.stringify(order1)
//     // });

//     // let createdOrder = await orderResponse.json();
//     // let orderID = createdOrder.OrderID;

//     // console.log("OrderID:", orderID);

//     // debugger
//     // // Iterate through each book in the shopping cart and create an order detail
//     // for (let i = 0; i < shoppingCart.length; i++) {
//     //     let book = shoppingCart[i];

//     //     let orderDetail = {
//     //         OrderDetailID: 0, // Let the server handle the auto-increment
//     //         OrderID: orderID, // Use the OrderID from the created order
//     //         BookID: book.BookID, // Replace BookID with the correct property from your book object
//     //         // Add other properties for order detail as needed
//     //     };

//     //     // Make a POST request to create the order detail
//     //     await fetch(odurl, {
//     //         method: "POST",
//     //         body: JSON.stringify(orderDetail),
//     //         headers: {
//     //             "Content-type": "application/json; charset=UTF-8"
//     //         }
//     //     });
//     // }
// }