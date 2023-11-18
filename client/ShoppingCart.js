let shoppingCart = [];
let conditions = [];
let Customers = [];
const url = "http://localhost:5263/api/Customer"


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
            `;

            cartItemsList.appendChild(listItem);
        });

        cartItemCount.textContent = shoppingCart.length; // Update the cart item count
    } else {
        // Display a message if the cart is empty
        cartItemsList.innerHTML = '<li class="list-group-item">Your shopping cart is empty.</li>';
        cartItemCount.textContent = '0';
    }
}



async function checkout() {
    // Get form values
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let country = document.getElementById('country').value;
    let state = document.getElementById('state').value;
    let zip = document.getElementById('zip').value;

    // You can now use these values as needed in your checkout logic
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Address:', address);
    console.log('Country:', country);
    console.log('State:', state);
    console.log('Zip:', zip);

    debugger
    // Your additional checkout logic here
}

