import { observable } from 'mobx';


export const WatchListStore = observable(
    {   
        movies:[],
        checkLocal(){
            if (localStorage.getItem("watch_list") === null){
                localStorage.setItem("watch_list", JSON.stringify(WatchListStore.movies));
            }
            else{
                WatchListStore.movies = (JSON.parse(localStorage.getItem("watch_list")));
            }


        },
        addMovie(movie){
            if(WatchListStore.movies.some(item => item.id === movie.id)){
                alert("This Movie is already on your watch list");
            }
            else{
                WatchListStore.movies.push(movie);
                localStorage.setItem("watch_list", JSON.stringify(WatchListStore.movies));
            }
        },
        deleteMovie(id){
            WatchListStore.movies = WatchListStore.movies.filter(movie => movie.id !== id);
            localStorage.setItem("watch_list", JSON.stringify(WatchListStore.movies));
        }
    }
); 