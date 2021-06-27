import React from "react";
import {useState, useEffect} from 'react';
import MovieItem from "./MovieItem";
import { useObserver } from 'mobx-react';
import {observable} from 'mobx';
import { MovieStore } from "../stores/MovieStore";
import "../style/MovieSearch.scss";
import MovieModal from "./MovieModal";
import {ModalStore} from "../stores/ModalStore"

function MovieSearch(props){
    const [query, setQuery] = useState("")
    const [showModal, setShowModal] = useState(false)

    function displayModal(){
        return(
            <MovieModal title = {ModalStore.movie.title} overview = {ModalStore.movie.overview} image_link = {ModalStore.movie.image_link} vote_average = {ModalStore.movie.vote_average} vote_count = {ModalStore.movie.vote_count} onClick = {()=>{
                ModalStore.movie = {};
                setShowModal(false)}}></MovieModal>
        );
    }


    useEffect(() =>{
        if(MovieStore.movies.length === 0){
            MovieStore.get_popular();
        }
        window.scrollTo(0,0)
    });



    return useObserver( () => (
        <div class = "col justify-content-center">
            {
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
                            MovieStore.query_movies(query);
                        }}></i>
                        
                    </span>
                </div>
            </div>
           
            <div class = "container-fluid">
                <div class = "row">
                    {MovieStore.movies.map((movie) => {
                        return <MovieItem title = {movie.title} image_link = {movie.image_link} overview = {movie.overview} onClick = {() => {
                            ModalStore.movie = movie;
                            setShowModal(true)
                        
                        }}/>
                    })}
                </div>
            </div>
        </div>
        </div>
    ));

} export default MovieSearch