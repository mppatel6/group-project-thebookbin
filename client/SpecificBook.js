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
                    <p id="newPrice">New: $${myBooks.newPrice} (${myBooks.newQuantity} available) <button onclick="handleNewPriceClick('${myBooks.bookName}', 'New', ${myBooks.newPrice}, ${myBooks.newQuantity})">Add to Cart</button></p>
                    <p id="goodPrice">Good: $${myBooks.goodPrice} (${myBooks.goodQuantity} available) <button onclick="handleGoodPriceClick('${myBooks.bookName}', 'Good', ${myBooks.goodPrice}, ${myBooks.goodQuantity})">Add to Cart</button></p>
                    <p id="poorPrice">Poor: $${myBooks.poorPrice} (${myBooks.poorQuantity} available) <button onclick="handlePoorPriceClick('${myBooks.bookName}', 'Poor', ${myBooks.poorPrice}, ${myBooks.poorQuantity})">Add to Cart</button></p>
                </div>
            </div>
    </div>
    `
    document.getElementById('bookbody').innerHTML = html
}

async function handleNewPriceClick(){

}

async function handleGoodPriceClick(){

}

async function handlePoorPriceClick(){
    
}