import axios from 'axios';
import dotenv from 'dotenv'
import { observable } from 'mobx';


export const MovieStore = observable(
    {   
        //max pages variabel for movie search to confirm page number is not going beyond
        max_pages: 0,
        //request type for movie search to repeat requests with new page variable
        request_type:"",
        movies:[],
        //grab movies by popularity with page override and set request type and max pages
        get_popular(page =1){
            axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+process.env.REACT_APP_API_KEY+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+page+"&with_watch_monetization_types=flatrate")
            .then(function(response){
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
                MovieStore.request_type = "getPopular";
                MovieStore.max_pages = response.data.total_pages;
                })
            .catch(function(error){
                console.log(error)
                return <h1>{error}</h1>
            })
        },
        //get popular movies with a genre_id passed in and an overrideable variable for pages and set request type and max pages
        get_popular_genre(genre_string, page =1){
            axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+process.env.REACT_APP_API_KEY+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+page+"&with_genres="+genre_string+"&with_watch_monetization_types=flatrate")
            .then(function(response){
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
                MovieStore.request_type = "getPopularGenre "+genre_string;
                MovieStore.max_pages = response.data.total_pages;
                })
            .catch(function(error){
                console.log(error)
                return <h1>{error}</h1>
            })
        },
        //grab movies filtered by query with an override for pages and set request type and max pages
        query_movies(query, page =1){
            axios.get("https://api.themoviedb.org/3/search/movie?api_key="+process.env.REACT_APP_API_KEY+"&language=en-US&query="+query+"&page="+page+"&include_adult=false")
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
                MovieStore.request_type = "queryMovies "+query;
                MovieStore.max_pages = response.data.total_pages;
        })
        .catch(function(error){
            console.log(error)
            return <h1>{error}</h1>
        })
        return MovieStore.movies;
        }
    }
); 
