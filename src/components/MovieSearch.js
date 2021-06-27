import React from "react";
import {useState, useEffect} from 'react';
import MovieItem from "./MovieItem";
import { useObserver } from 'mobx-react';
import {observable} from 'mobx';
import { MovieStore } from "../stores/MovieStore";
import "../style/MovieSearch.scss";
import MovieModal from "./MovieModal";
import {ModalStore} from "../stores/ModalStore";
import {WatchListStore} from "../stores/WatchListStore";

function MovieSearch(props){
    const [query, setQuery] = useState("")
    const [showModal, setShowModal] = useState(false)

    function displayModal(){
        return(
            <MovieModal title = {ModalStore.movie.title} overview = {ModalStore.movie.overview} image_link = {ModalStore.movie.image_link} vote_average = {ModalStore.movie.vote_average} vote_count = {ModalStore.movie.vote_count} onClick = {()=>{
                //on button click set ModalStore's movie to none and set the ShowModal state to false so it doesn't display any longer
                ModalStore.movie = {};
                setShowModal(false)}}></MovieModal>
        );
    }
    useEffect(() =>{
        //if there are no movies in the movies store, grab movies by popularity
        if(MovieStore.movies.length === 0){
            MovieStore.get_popular();
        }
        //scroll to MovieModal
        window.scrollTo(0,0)
    });

    return useObserver( () => (
        <div class = "col justify-content-center">
            {
                //if a movie is clicked on show Modal is set to true and the MovieModal Component is displayed with the selected movie's data otherwise do not display the modal
                showModal?
                displayModal()
                : null
            }
        <div class = "search_page container">
            
            <div class = "search_bar container">
                <div class = "input-group rounded">
                    <input type = "search" class = "form-control rounded" placeholder = "Search Movies" aria-label = "Search Movies" onChange = {(e) => setQuery(e.target.value)}/>
                    <span class = "input-group-text border-0" id= "search-addon">
                        <i className = "fa fa-search" onClick = {() => {
                            //search movies filtered by the searchbar's input text
                            MovieStore.query_movies(query);
                        }}></i>
                    </span>
                </div>
            </div>
           
            <div class = "container-fluid">
                <div class = "row">
                    {/*map all movies in the MovieStore to a MovieItem Component*/}
                    {MovieStore.movies.map((movie) => {
                        return <MovieItem  title = {movie.title} image_link = {movie.image_link} overview = {movie.overview} onClick = {() => {
                            ModalStore.movie = movie;
                            setShowModal(true)
                        }}
                        addOnClick = {()=>{
                            WatchListStore.addMovie(movie);
                        }}
                        />
                    })}
                </div>
            </div>
        </div>
        </div>
    ));

} export default MovieSearch