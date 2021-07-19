import React from "react";
import {useState, useEffect} from 'react';
import MovieItem from "./MovieItem";
import { useObserver } from 'mobx-react';
import { MovieStore } from "../stores/MovieStore";
import "../style/MovieSearch.scss";
import MovieModal from "./MovieModal";
import {ModalStore} from "../stores/ModalStore";
import PageNavigator from "./PageNavigator";
function MovieSearch(props){
    const [query, setQuery] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [pageNum, setPageNum] = useState(1);

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
            setPageNum(1);
        }
        //scroll to MovieModal if showModal's state is true
        if(showModal ===true){
            window.scrollTo(0,0)
    
        }  
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
                    <input type = "search" class = "form-control rounded" placeholder = "Search Movies" aria-label = "Search Movies" onChange = {(e) => {
                        setQuery(e.target.value)
                        MovieStore.query_movies(e.target.value);
                        setPageNum(1);
                        if(e.target.value === ""){
                            MovieStore.get_popular();
                        }
                    }}
                    />
                </div>
            </div>
            {/*each column in this row is an item that on click runs a request for movies with the passed genre id string */}
            <div class = "genre-row row">
                <p class = "col" onClick = {()=>{
                    MovieStore.get_popular_genre("37");
                    setPageNum(1);
                }}>Western</p>
                <p class = "col"onClick = {()=>{
                    MovieStore.get_popular_genre("80");
                    setPageNum(1);
                }}>Crime</p>
                <p class = "col"onClick = {()=>{
                    MovieStore.get_popular_genre("10752");
                    setPageNum(1);
                }}>History</p>
                <p class = "col"onClick = {()=>{
                    MovieStore.get_popular_genre("36");
                    setPageNum(1);
                }}>Action</p>
                <p class = "col"onClick = {()=>{
                    MovieStore.get_popular_genre("12");
                    setPageNum(1);
                }}>Adventure</p>
                <p class = "col"onClick = {()=>{
                    MovieStore.get_popular_genre("16");
                    setPageNum(1);
                }}>Animation</p>
                <p class = "col"onClick = {()=>{
                    MovieStore.get_popular_genre("99");
                    setPageNum(1);
                }}>Documentary</p>
                <p class = "col"onClick = {()=>{
                    MovieStore.get_popular_genre("18");
                    setPageNum(1);
                }}>Drama</p>
                <p class = "col"onClick = {()=>{
                    MovieStore.get_popular_genre("27");
                    setPageNum(1);
                }}>Horror</p>
                <p class = "col"onClick = {()=>{
                    MovieStore.get_popular_genre("878");
                    setPageNum(1);
                }}>Science Fiction</p>
            </div>
            <div class = "container-fluid">
                <div class = "row">
                    {/*map all movies in the MovieStore to a MovieItem Component*/}
                    {MovieStore.movies.map((movie) => {
                        return <MovieItem movie = {movie} id = {movie.id} title = {movie.title} image_link = {movie.image_link} overview = {movie.overview} onClick = {() => {
                            ModalStore.movie = movie;
                            setShowModal(true)
                        }}
                        />
                    })}
                </div>
            </div>
            <PageNavigator></PageNavigator>

            </div>
        </div>
    ));

} export default MovieSearch