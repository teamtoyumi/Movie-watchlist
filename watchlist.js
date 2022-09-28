const watchlistContainer = document.getElementById("watchlist-container")

if (localStorage.movieList === ""){
  document.getElementById("watchlist-initial-bg").classList.remove("display")  
} else {
   createWatchlist() 
}


function createWatchlist(){
    document.getElementById("watchlist-initial-bg").classList.add("display")
    //list = JSON.stringify(localStorage)
    const list = localStorage.getItem("movieList")
    watchlistContainer.innerHTML = list
    const buttonObj =document.getElementsByTagName("button")
    for (item of buttonObj){
        item.innerHTML = "remove"
        item.classList.remove("icon-plus")
        item.classList.add("icon-minus")
    }
}

function saveID(){
    movieID = event.target.name
    document.getElementById(movieID).outerHTML = ""
    localStorage.setItem("movieList", watchlistContainer.innerHTML)
    if (localStorage.movieList === ""){
    document.getElementById("watchlist-initial-bg").classList.remove("display")}
}


