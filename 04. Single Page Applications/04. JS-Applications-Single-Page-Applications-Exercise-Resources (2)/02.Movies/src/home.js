import {
    showView
} from "./util";

const section = document.querySelector('#home-page');
const catalog = section.querySelector('.card-deck d-flex justify-content-center');

export function homePage() {
    showView(section);
    displayMovies();
}
async function displayMovies() {
    catalog.replaceChildren(spinner());
    const movies = await getMovies();
    catalog.replaceChildren(...movies.map(createMoviePreview));
}

function createMoviePreview(movie) {
    const elemnt = document.createElement('div');
    elemnt.className = 'card mb-4';
    elemnt.innerHTML = `<img class="card-img-top" src="${movie.img}"
    alt="Card image cap" width="400">
<div class="card-body">
   <h4 class="card-title">${movie.title}</h4>
</div>
<div class="card-footer">
   <a data-id = "${movie._id}" href="/details/${movie._id}">
       <button type="button" class="btn btn-info">Details</button>
   </a>
</div>`
}
async function getMovies() {
    const response = await fetch('http://localhost:3030/data/movies');
    const data = await response.json();

    return data;
}
//window.getMovies = getMovies;