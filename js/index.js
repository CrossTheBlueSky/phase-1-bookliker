let currentBook
const testUser = {
    id: 613,
    username: "test"
}

function initializeOrUpdate(){
    fetch("http://localhost:3000/books")
    .then(r=>r.json())
    .then((data)=>{
        data.forEach((book)=>{
            if(!book.liked){
                book.liked = false
            }
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
    currentBook = book
    let likeText
    book.liked ? likeText = "Unlike" : likeText = "Like"
    const showPanel = document.querySelector("#show-panel")
    showPanel.innerHTML = `
    <img src=${book.img_url} />
    <h5>${book.description}</h5>
    <p>Liked by ${getUsers(book.users)}</p>
    <button id="like-button">${likeText}</button>
    `
    document.querySelector("#like-button").addEventListener("click", ()=>{

        if(book.liked){
            removeLikedUser(book)
        }else{
            book.users.push(testUser)
        addLikedUser(book)
        }
        book.liked = !book.liked
        
    })
}

function getUsers(arr){
    let userArr = []
    arr.forEach(e=>userArr.push((" " + e.username)))
    return  userArr.toString()
}

function addLikedUser(book){
    const users = book.users
    const usersObj = {users}
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers:{
            "Content-Type" : "application/json"

        },
        body: JSON.stringify(usersObj)
    }).then(()=>{
        showDetails(currentBook)
    })
}

function removeLikedUser(book){

    function arrRemover(arr){
        arr.pop()
        return arr
    }

    const users = arrRemover(book.users)
    const usersObj = {users}
    currentBook.users = users
    console.log (usersObj)

    fetch(`http://localhost:3000/books/${book.id}/`, {
        method: "PATCH",
        headers:{
            "Content-Type" : "application/json"

        },
        body: JSON.stringify(usersObj)
    }).then(()=>{
        showDetails(currentBook)
    })
}
initializeOrUpdate()