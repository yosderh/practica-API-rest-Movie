const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key' : APIKEY,
    }
});

async function getTrendingMoviesPreview (){
    const {data} = await api('trending/movie/day');
    const movies = await data.results;

    trendingMoviesPreviewList.innerHTML='';
    movies.forEach(movie => {
       const movieContainer = document.createElement('DIV');
       movieContainer.classList.add('movie-container');
       
       const movieImg = document.createElement('IMG');
            movieImg.classList.add('movie-img');
            movieImg.setAttribute('alt',movie.title);
            movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300'+movie.poster_path);

            movieContainer.appendChild(movieImg);
            trendingMoviesPreviewList.appendChild(movieContainer);

    });
}

async function getCategoriesPreview (){
    const {data} = await api('genre/movie/list');
    const categories = await data.genres;

    // console.log(categories);
    categoriesPreviewList.innerHTML = '';

    categories.forEach(category => {
       const categoryContainer = document.createElement('DIV');
       categoryContainer.classList.add('category-container');
       
       const categoryTitle = document.createElement('H3');
            categoryTitle.classList.add('category-title');
            categoryTitle.setAttribute('id','id'+category.id);
            categoryTitle.addEventListener('click', ()=>{
                location.hash = `#category=${category.id}-${category.name}`;
            })

            categoryTitle.innerText = category.name;

        
            categoryContainer.appendChild(categoryTitle);
            categoriesPreviewList.appendChild(categoryContainer);

    });
}

async function getMoviesByCategory (id){
    const {data} = await api('discover/movie',{
     params:{width_genres: id},
    });
    const movies = await data.results;
console.log(movies)
    genericSection.innerHTML='';
    movies.forEach(movie => {
       const movieContainer = document.createElement('DIV');
       movieContainer.classList.add('movie-container');
       
       const movieImg = document.createElement('IMG');
            movieImg.classList.add('movie-img');
            movieImg.setAttribute('alt',movie.title);
            movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300'+movie.poster_path);

            movieContainer.appendChild(movieImg);
            genericSection.appendChild(movieContainer);
    });
    }
