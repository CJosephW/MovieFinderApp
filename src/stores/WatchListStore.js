import { observable } from 'mobx';


export const WatchListStore = observable(
    {   
        movies:[],
        addMovie(movie){
            if(WatchListStore.movies.some(item => item.id === movie.id)){
                alert("This Movie is already on your watch list");
            }
            else{
                WatchListStore.movies.push(movie);
            }
        },
        deleteMovie(id){
            WatchListStore.movies = WatchListStore.movies.filter(movie => movie.id !== id);
        }
    }
); 