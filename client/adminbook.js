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
            <div>
                <button>Edit</button></p>
                <button>Delete</button></p>
            </div>
        </div>
    </div>
    `
    document.getElementById('bookbody').innerHTML = html
}

