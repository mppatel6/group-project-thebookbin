// ShoppingCart.js

let shoppingCart = [];
let conditions = [];

shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
conditions = JSON.parse(localStorage.getItem('conditions'));

console.log(shoppingCart);
console.log(conditions);

function handleOnLoad() {
    displayCartDetails();
}

function displayCartDetails() {
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

function checkout() {
    // Your checkout logic here
    console.log('Checkout button clicked');
}
