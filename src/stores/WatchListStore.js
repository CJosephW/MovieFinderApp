import { observable } from 'mobx';


export const WatchListStore = observable(
    {   
        movies:[],
        //check cocal storage for watch_list item and if it doesn't exist, set it
        checkLocal(){
            if (localStorage.getItem("watch_list") === null){
                localStorage.setItem("watch_list", JSON.stringify(WatchListStore.movies));
            }
            else{
                WatchListStore.movies = (JSON.parse(localStorage.getItem("watch_list")));
            }
        },
        //add movie to watch list if it does not already exist, then if conditions are met, set local storage watch list to the store's movies array
        addMovie(movie){
            if(WatchListStore.movies.some(item => item.id === movie.id)){
                alert("This Movie is already on your watch list");
            }
            else{
                WatchListStore.movies.push(movie);
                localStorage.setItem("watch_list", JSON.stringify(WatchListStore.movies));
            }
        },
        //remove movie from watchlist by id and then update local storage's watch list item to this store's movie array
        deleteMovie(id){
            WatchListStore.movies = WatchListStore.movies.filter(movie => movie.id !== id);
            localStorage.setItem("watch_list", JSON.stringify(WatchListStore.movies));
        }
    }
); 