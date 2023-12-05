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
    let totalPrice = 0; 

    cartItemsList.innerHTML = ''; 

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

            
            totalPrice += calculatePrice(book, conditions[index]);
        });

        cartItemCount.textContent = shoppingCart.length; 

        
        cartItemsList.innerHTML += `<li class="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>$${totalPrice.toFixed(2)}</strong>
        </li>`;
    } else {
        
        cartItemsList.innerHTML = '<li class="list-group-item">Your shopping cart is empty.</li>';
        cartItemCount.textContent = '0';
    }
}

function removeBook(index) {
    shoppingCart.splice(index, 1);

    conditions.splice(index, 1);

    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    localStorage.setItem('conditions', JSON.stringify(conditions));

    displayCartDetails();
}

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

    
    let order = {
        OrderID: 0, 
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
        for (let i = 0; i < shoppingCart.length; i++) {
            console.log(shoppingCart)
            let book = shoppingCart[i];
    
            let orderDetail = {
                OrderDetailID: 0, 
                OrderID: 0, 
                BookID: book.bookID, 
            };
            
            console.log(orderDetail)
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