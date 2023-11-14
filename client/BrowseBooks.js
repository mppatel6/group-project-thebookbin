let app = document.getElementById("app")
let BooksUnsort = []
let Books = []
const url = "http://localhost:5263/api/Book"

async function handleOnLoad(){
    fetchBooks()
    let html = `
    <div id = "scroll"></div>
    `
    document.getElementById('app').innerHTML=html
}

async function fetchBooks(){
    Books = await getBooks()
    console.log(Books)

    createScroll(Books)
}

async function getBooks(){
    let response = await fetch(url)
    let books = await response.json()

    return await books
}

// async function createBookTable(Books){
//     let html = `
//     <div class="table-container">
//         <table id="table" class="table">
//     `
//     Books.forEach(function (book) {
//         html += `
//             <tr>
//                 <td><img src="${book.bookImage}" alt="failed to load"></td>
//             </tr>
//             <tr>
//                 <td>${book.bookName}</td>
//             </tr>
//         `
//     })
//     html += `
//             </table>
//         </div>
//     `;
//     document.getElementById('table').innerHTML = html;
// }

// async function createScroll(Books){
//     let html =`
//     <div class="container custom-margin">
//         <div id="bookCarousel" class="carousel slide" data-bs-slide="carousel">
//             <div class="carousel-inner">
//                 <div class="carousel-item active">
//                     <div class="row">
//                         <div class="col">`
//                                 Books.forEach(function(book){
//                                     html +=`
//                                         <img class ="book-image" src="${book.bookImage}" alt="failed to load">
//                                         `
//                                 })
//         html +=`
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>`
//     document.getElementById('scroll').innerHTML = html
                        
// }

async function createScroll(Books){
    let html =`
    <div class="container custom-margin">
        <div id="bookCarousel" class="carousel slide" data-bs-slide="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="row">`
                        Books.forEach(function(book){
                            html += `
                            <div class="col">
                                <div class="book-container">
                                    <img src="${book.bookImage}" class="d-block w-100 book-image" alt="Book 10">
                                    <button class="btn btn-primary buy-button">Buy</button>
                                </div>
                            </div>`
                        })
    html +=`        </div>
                </div>
            </div>
        </div>
    </div>`
    document.getElementById('scroll').innerHTML = html                       
}
