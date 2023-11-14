let app = document.getElementById("app")
let BooksUnsort = []
let Books = []
const url = "http://localhost:5263/api/Book"

async function handleOnLoad(){
    fetchBooks()
    let html = `
    `
    document.getElementById('app').innerHTML=html
}

async function fetchBooks(){
    Books = await getBooks()
    console.log(Books)
}

async function getBooks(){
    let response = await fetch(url)
    let books = await response.json()

    return await books
}