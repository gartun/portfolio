
$(document).ready(function() {
    $("#searchForm").on("submit", function(e) {
        $("#sentence").text('Bekleyin...');
        let searchText = $("#searchText").val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    axios.get("https://www.omdbapi.com/?apikey=3ce660f6&s=" + searchText)
        .then((response) => {
            console.log(response)
            $("#sentence").text('Film arayın...');
            let movies = response.data.Search;
            let output = "";
            $.each(movies, (index, movie) => {
              
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${ movie.Poster != 'N/A' ? movie.Poster : 'img/noimg.svg'}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary mb-5" href="#">Film Ayrıntıları</a>
                    </div>    
                </div>
                `
            });
            $("#movies").html(output);
        })
        .catch((err) => {
            $("#sentence").text('Film arayın...');
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'themovie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    axios.get("https://www.omdbapi.com/?apikey=3ce660f6&i=" + movieId)
        .then((response) => {
            let movie = response.data;

            let output = `
                <div class=row>
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Tür:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Vizyon Yılı:</strong> ${movie.Year}</li>
                        <li class="list-group-item"><strong>Süre:</strong> ${movie.Runtime}</li>
                        <li class="list-group-item"><strong>Oyuncular:</strong> ${movie.Actors}</li>
                        <li class="list-group-item"><strong>Yönetmen:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Senarist:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Ülke:</strong> ${movie.Country}</li>
                        <li class="list-group-item"><strong>IMDB Puanı:</strong> ${movie.imdbRating}</li>
                    </ul>
                </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3 class="ml-3 mt-2">Konu</h3>
                        <p class="ml-3">${movie.Plot}</p>
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary ml-1">IMDB Sitesine Git</a>
                        <a href="searchmovie.html" class="btn btn-secondary">Aramaya Geri Dön</a>
                    </div>
                </div>
            `;
            $("#movie").html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}