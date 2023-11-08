function initialize(){
    fetch("http://localhost:3000/books")
    .then(r=>r.json())
    .then((data)=>{
        data.forEach((book)=>{
            generateBook(book)
        })
    })
}

function generateBook(book){
    const bookList = document.querySelector("#list")
    const newBook = document.createElement("li")
    newBook.innerHTML = `
    <h4 style="text-decoration:underline">${book.title}</h4>
    `
    newBook.addEventListener("click", ()=>{
        showDetails(book)
    })
    bookList.append(newBook)
}

function showDetails(book){
    const showPanel = document.querySelector("#show-panel")
    showPanel.innerHTML = `
    <img src=${book.img_url} />
    <h5>${book.description}</h5>
    <p>Liked by ${getUsers(book.users)}</p>
    `
}

function getUsers(arr){
    let userArr = []
    arr.forEach(e=>userArr.push((" " + e.username)))
    return userArr.toString()
}
initialize()