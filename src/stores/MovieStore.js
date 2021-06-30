import axios from 'axios';
import dotenv from 'dotenv'
import { observable } from 'mobx';


export const MovieStore = observable(
    {   
        movies:[],
        get_popular(){
            //grab movies by popularity, TODO add pages
            axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+process.env.REACT_APP_API_KEY+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
            .then(function(response){
                MovieStore.movies = []
                console.log("getting popular")
                for(var result of response.data.results){
                    MovieStore.movies.push({
                        id: result.id,
                        title: result.title,
                        image_link: "https://image.tmdb.org/t/p/original" + result.poster_path,
                        overview: result.overview,
                        vote_average: result.vote_average,
                        vote_count: result.vote_count
                    })
                }
                })
            .catch(function(error){
                console.log(error)
                return <h1>{error}</h1>
            })
        },
        get_popular_genre(genre_string){
            axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+process.env.REACT_APP_API_KEY+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="+genre_string+"&with_watch_monetization_types=flatrate")
            .then(function(response){
                console.log("getting western genre")
                MovieStore.movies = []
                for(var result of response.data.results){
                    MovieStore.movies.push({
                        id: result.id,
                        title: result.title,
                        image_link: "https://image.tmdb.org/t/p/original" + result.poster_path,
                        overview: result.overview,
                        vote_average: result.vote_average,
                        vote_count: result.vote_count
                    })
                }
                console.log(MovieStore.movies)

                })
            .catch(function(error){
                console.log(error)
                return <h1>{error}</h1>
            })
        },
        query_movies(query){
            //grab movies filtered by query TODO: add pages for more results
            axios.get("https://api.themoviedb.org/3/search/movie?api_key="+process.env.REACT_APP_API_KEY+"&language=en-US&query="+query+"&include_adult=false")
            .then(function(response){
                MovieStore.movies = [];
                for(var result of response.data.results){
                    MovieStore.movies.push({
                        id: result.id,
                        title: result.title,
                        image_link: "https://image.tmdb.org/t/p/original" + result.poster_path,
                        overview: result.overview,
                        vote_average: result.vote_average,
                        vote_count: result.vote_count
                    })
                }
                console.log(MovieStore.movies);
        })
        .catch(function(error){
            console.log(error)
            return <h1>{error}</h1>
        })
        return MovieStore.movies;

        }
        
    }
); 
