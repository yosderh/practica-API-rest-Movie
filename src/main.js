const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key' : APIKEY,
    }
});


    // UTILS
    function createMovies (movies, container) {
       
        container.innerHTML='';

        movies.forEach(movie => {
           const movieContainer = document.createElement('DIV');
           movieContainer.classList.add('movie-container');

           movieContainer.addEventListener('click', ()=>{
                location.hash = '#movie='+movie.id;

           });
           
           const movieImg = document.createElement('IMG');
                movieImg.classList.add('movie-img');
                movieImg.setAttribute('alt',movie.title);
                movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300'+movie.poster_path);
        
    
            movieContainer.appendChild(movieImg);
            container.appendChild(movieContainer);
            

        });
     }

     function createCategories(categories, container){

        container.innerHTML = '';
    
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
               container.appendChild(categoryContainer);
    
        });
    }

    //LLAMADO A API
    async function getSectionTrendingMovies (){
        const {data} = await api('trending/movie/day');
        const movies = await data.results;
    
        createMovies(movies, genericSection);
    }
    async function getTrendingMoviesPreview (){
        const {data} = await api('trending/movie/day');
        const movies = await data.results;
    
        createMovies(movies, trendingMoviesPreviewList);
    }

    async function getMoviesByID (id){
        const {data} = await api('movie/'+id);
            console.log(data);

            const imgURL = 'https://image.tmdb.org/t/p/w500'+data.poster_path;
            headerSection.style.background = `linear-gradient(
                180deg,
                 rgba(0, 0, 0, 0.35) 19.27%,
                  rgba(0, 0, 0, 0) 29.17%
            ), 
             url(${imgURL})`;
            movieDetailTitle.innerHTML = data.title;
            movieDetailScore.innerHTML = data.vote_average;
            movieDetailDescription.innerHTML = data.overview;
            movieDetailDescription.innerHTML = data.overview;


            createCategories(data.genres, movieDetailCategoriesList);
            getMoviesRecomended(id);

    }

    async function getMoviesRecomended(id){
        const {data} = await api(`movie/${id}/recommendations`)
        const movies = data.results;
        console.log(movies);
        
        createMovies(movies, relatedMoviesContainer);

    }

    async function getMoviesByCategory (id){
        const {data} = await api('discover/movie',{
         params: { with_genres: id},
        });
        const movies = await data.results;
    
        createMovies(movies, genericSection);
    }

    async function getCategoriesPreview (){
        const {data} = await api('genre/movie/list');
        const categories = await data.genres;
    
        // console.log(categories);
        createCategories(categories, categoriesPreviewList);
    }

    async function getSearchMovies(query){
        const {data} = await api('search/movie',{params:{query}});
        const movies = data.results;
        console.log(movies);

        createMovies(movies, genericSection);

    }

    