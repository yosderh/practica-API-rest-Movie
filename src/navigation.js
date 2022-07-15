window.addEventListener('DOMContentLoaded', navigation, false);
window.addEventListener('hashchange', navigation, false);

searchFormBtn.addEventListener('click', ()=>{ location.hash= '#search='+searchFormInput.value});
trendingBtn.addEventListener('click', ()=>{location.hash= '#trends'});
arrowBtn.addEventListener('click', ()=>{

    history.back();
    // location.hash= '#home';
});


function navigation () {
    // console.log ({location});
    

    if(location.hash.startsWith('#trends')) {
        trendsPage();
    } else  if(location.hash.startsWith('#search=')) {
        searchPage();
    } else if(location.hash.startsWith('#movie=')) {
        moviePage();
    } else if(location.hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

navigation();

function trendsPage(){
    console.log('#trends');
    
    headerSection.classList.remove('header-container--long')
    headerSection.style.background= '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.innerHTML = 'Tendencias';
    getSectionTrendingMovies ();
}
function searchPage(){
    console.log('#search');


    headerSection.classList.remove('header-container--long')
    headerSection.style.background= '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    
    const [_, query] = location.hash.split('=');
    getSearchMovies(query);
}
function moviePage(){
    console.log('#movie');

    headerSection.classList.add('header-container--long')
    // headerSection.style.background= '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, movieID] = location.hash.split('=');

    getMoviesByID(movieID);
}
function categoryPage(){
    console.log('#category');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background= '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_ , categoryDate] = location.hash.split('='); // ['#category' , 'id-name']
    // console.log(categoryDate);
    const [categoryID , categoryName] = categoryDate.split('-');
    // console.log(categoryID);
    // console.log(categoryName);
    headerCategoryTitle.innerHTML = categoryName;

     getMoviesByCategory(categoryID);
}
function homePage(){
    console.log('#home');
    headerSection.classList.remove('header-container--long')
    headerSection.style.background= '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}


