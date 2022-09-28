const searchBtn = document.getElementById("search-btn")
const searchBar = document.getElementById("search-bar") //
const searchList = document.getElementById("movies-list")//
const movieContainer = document.getElementById("movie-container")
const initialBg = document.getElementById("initial-bg")
const watchlistBtn = document.getElementById("add-watchlist")
const movies = []
let savedMovieHtml = localStorage.getItem("movieList")


searchBtn.addEventListener("click", function(){
    let searchInput = searchBar.value
    fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=b215b7&type=movie`)
    .then(res => res.json())
    .then(data => {
        if(data.Response === "False"){
           initialBg.innerHTML = 
           `<p class="instructions light">Unable to find what you're looking                          for.<p class="instructions light">Please try another                                     search.</p>` 
        } else {
            let titles = []
            for (let i=0; i<5; i++){
                titles.push(data.Search[i].imdbID)
                }
            getSearchList(titles) 
        }
    })
    searchInput = ""
})

async function getSearchList(array){
    searchList.innerHTML = ``
    
    for (item of array){
        const response = await fetch(`https://www.omdbapi.com/?i=${item}&apikey=b215b7`)
        const data = await response.json()
        movies.push(data)}
            
    initialBg.classList.add("display")
    const moviesHtml = movies.map(getHTML)
    searchList.innerHTML = moviesHtml.join(" ")
} 


function getHTML(item){
       return   `
                <div id="${item.imdbID}">
                <div class="movie-container" id="movie-container">
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
                            <div>
                                <button onclick="saveID()" name="${item.imdbID}" class="movie-add icon-plus" id="suggestion-btn">Watchlist</button>
                            </div> 
                        </div>
                    </div>
                    <p class="movie-bio">${item.Plot}</p>
                </div>
            </div>
            </div>`
}
        
function saveID(){
    const movieID = event.target.name
    const newMovieHtml = document.getElementById(movieID).outerHTML
    const allSavedMovieHtml = savedMovieHtml + newMovieHtml
    localStorage.setItem("movieList", allSavedMovieHtml) 
}

