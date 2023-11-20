let app = document.getElementById("app")
let myBooks = []

async function handleOnLoad(){
    myBooks = JSON.parse(localStorage.getItem('myBooks'))
    console.log(myBooks)

    let html = `
    <div id = "bookbody"></div>
    `

    document.getElementById('app').innerHTML = html
    createBook(myBooks)
}

async function createBook(myBooks){
    console.log(myBooks)
    let html = `
    <div class="book-container">
            <img src="${myBooks.bookImage}" alt="${myBooks.bookName}" class="book-image">
            <div class="book-details">
                <h3>${myBooks.bookName}</h3>
                <p>Author: ${myBooks.bookAuthor}</p>
                <p>Genre: ${myBooks.bookGenre}</p>
                <div class="prices">
                    <p id="newPrice">New: $${myBooks.newPrice} (${myBooks.newQuantity} available) <button onclick="handleBuyClick('NEW')">Add to Cart</button></p>
                    <p id="goodPrice">Good: $${myBooks.goodPrice} (${myBooks.goodQuantity} available) <button onclick="handleBuyClick('GOOD')">Add to Cart</button></p>
                    <p id="poorPrice">Poor: $${myBooks.poorPrice} (${myBooks.poorQuantity} available) <button onclick="handleBuyClick('POOR')">Add to Cart</button></p>
                </div>
            </div>
    </div>
    `
    document.getElementById('bookbody').innerHTML = html
}


    // Function to handle adding a book to the shopping cart
async function handleBuyClick(condition) {
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let conditions = JSON.parse(localStorage.getItem('conditions')) || [];

    shoppingCart.push(myBooks);
    conditions.push(condition);

    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    localStorage.setItem('conditions', JSON.stringify(conditions));
}



function goToShoppingCartPage() {
    window.location.replace("shoppingcart.html", "_blank")
}