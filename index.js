const searchBtn = document.getElementById("search-btn")
const searchBar = document.getElementById("search-bar")
const searchList = document.getElementById("movies-list")
const movieContainer = document.getElementById("movie-container")
const initialBg = document.getElementById("initial-bg")
const watchlistBtn = document.getElementById("add-watchlist")
const goToHomeBtn = document.getElementById("watchlist-home-btn")
const goToWatchlistBtn = document.getElementById("home-watchlist-btn")
const watchlistContainer = document.getElementById("page2-watchlist")
let moviesHtml
let movies = []
let watchlist = []
const watchlistArray = []


goToWatchlistBtn.addEventListener("click", function(){
    document.getElementById("search-page").classList.add("display")
    document.getElementById("watchlist-page").classList.remove("display")
})

goToHomeBtn.addEventListener("click", function(){
    document.getElementById("search-page").classList.remove("display")
    document.getElementById("watchlist-page").classList.add("display")
})


searchBtn.addEventListener("click", function(e){
    e.preventDefault()
    const searchInput = searchBar.value
    fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=b215b7&type=movie`)
    .then(res => res.json())
    .then(data => {
        if(data.Response === "False"){
           initialBg.innerHTML = 
           `<p class="instructions light">Unable to find what you're looking                          for.<p class="instructions light">Please try another                                     search.</p>` 
        } else{
            let titles = []
            for (let i=0; i<5; i++){
                titles.push(data.Search[i].imdbID)
                }
            getSearchList(titles) 
        }
    })
    document.getElementById("form").reset()
})

function getSearchList(array){
    searchList.innerHTML = ``
    for (item of array){
        fetch(`https://www.omdbapi.com/?i=${item}&apikey=b215b7`)
        .then(res => res.json())
        .then(data => {
            let movies = []
            movies.push(data)
            initialBg.classList.add("display")
            moviesHtml = movies.map(getHTML)
            for (movie of moviesHtml){
                searchList.innerHTML += movie.html}
            })
    
    }
} 


function getHTML(item){
       return { watchlist: false,
                html: `<div class="movie-container" id="movie-container">
                <image class="movie-poster" src="${item.Poster}">
                <div class="movie-info">
                    <div class="movie-title">
                        <h2>${item.Title}</h2>
                        <div class="suggestions">
                        <image class="rating" src="icons/star.png">
                        <p class="rating">${item.imdbRating}</p>
                        </div>
                    </div>
                    <div class="movie-meta">
                        <p>${item.Runtime}</p>
                        <p>${item.Genre}</p>
                        <div class="suggestions">
                            <image src="icons/plus.png" class="plus movie">
                            <button onclick="addWatchlist()" name="${item.imdbID}" class="movie-add">Watchlist</button>
                        </div>
                    </div>
                    <p class="movie-bio">${item.Plot}</p>
                </div>
            </div>`
        } 
}
        
function addWatchlist(){
    movieID = event.target.name
    addToWatchlist(movieID)
}

function addToWatchlist(movieID){
    document.getElementById("watchlist-initial-bg").classList.add("display")
    fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=b215b7`)
    .then (res => res.json())
    .then (item => {
         watchlistArray.push(
             `<div class="movie-container" id="movie-container">
                <image class="movie-poster" src="${item.Poster}">
                <div class="movie-info">
                    <div class="movie-title">
                        <h2>${item.Title}</h2>
                        <div class="suggestions">
                        <image class="rating" src="icons/star.png">
                        <p class="rating">${item.imdbRating}</p>
                        </div>
                    </div>
                    <div class="movie-meta">
                        <p>${item.Runtime}</p>
                        <p>${item.Genre}</p>
                        <div class="suggestions">
                            <image src="icons/minus.png" class="plus movie">
                            class="movie-add">Remove</button>
                        </div>
                    </div>
                    <p class="movie-bio">${item.Plot}</p>
                </div>
            </div>`)
         watchlistContainer.innerHTML = watchlistArray.join(" ")   
        
       
    })
}

