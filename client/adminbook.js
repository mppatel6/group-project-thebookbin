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
    <div class="box">
        <form class="form-admin">
        <img src="${myBooks.bookImage}" alt="${myBooks.bookName}" class="book-image">
        <div>
            <h3 style="display: flex; justify-content: space-around;">${myBooks.bookName}</h3>
            <p style="display: flex; justify-content: space-around;">Author: ${myBooks.bookAuthor}</p>
            <p style="display: flex; justify-content: space-around;">Genre: ${myBooks.bookGenre}</p>
            <div style="display: flex; justify-content: space-around;">
                <button class="btn btn-primary">Edit</button></p>
                <button class="btn btn-primary">Delete</button></p>
            </div>
        </div>
        </div>
    </div>
    `
    document.getElementById('bookbody').innerHTML = html
}