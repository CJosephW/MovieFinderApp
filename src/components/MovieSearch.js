import React from "react";
import {useState, useEffect} from 'react';
import MovieItem from "./MovieItem";
import { useObserver } from 'mobx-react';
import {observable} from 'mobx';
import { MovieStore } from "../stores/MovieStore";
import "../style/MovieSearch.scss";

function MovieSearch(props){
    const [query, setQuery] = useState("")
    

    useEffect(() =>{
        if(MovieStore.movies.length === 0){
            console.log('this is being ran')
            MovieStore.get_popular();
            console.log(MovieStore.movies)
        }
    });

    return useObserver( () => (
        <div class = "container">
            <div class = "search_bar container">
                <div class = "input-group rounded">
                    <input type = "search" class = "form-control rounded" placeholder = "Search Movies" aria-label = "Search Movies" onChange = {(e) => setQuery(e.target.value)}/>
                    <span class = "input-group-text border-0" id= "search-addon">
                        <i className = "fa fa-search" onClick = {() => {
                            MovieStore.query_movies(query);
                        }}></i>
                        
                    </span>
                </div>
            </div>
            <div class = "container-fluid">
                <div class = "row">
                    {MovieStore.movies.map((movie) => {
                        return <MovieItem title = {movie.title} image_link = {movie.image_link} overview = {movie.overview}/>
                    })}
                </div>
            </div>
        </div>
        
    ));

} export default MovieSearch