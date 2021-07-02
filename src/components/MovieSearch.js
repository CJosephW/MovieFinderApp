import React from "react";
import {useState, useEffect} from 'react';
import MovieItem from "./MovieItem";
import { useObserver } from 'mobx-react';
import { MovieStore } from "../stores/MovieStore";
import "../style/MovieSearch.scss";
import MovieModal from "./MovieModal";
import {ModalStore} from "../stores/ModalStore";

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
                    <input type = "search" class = "form-control rounded" placeholder = "Search Movies" aria-label = "Search Movies" onChange = {(e) => setQuery(e.target.value)}/>
                    <span class = "input-group-text border-0" id= "search-addon">
                        <i className = "fa fa-search" onClick = {() => {
                            //search movies filtered by the searchbar's input text
                            MovieStore.query_movies(query);
                            setPageNum(1);
                        }}></i>
                    </span>
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
                <div class = "page-navigator">
                    {/*on fastbackward icon's click; based on the last request type it will take that request and return to the first page, if it is not already */}
                    <i className = "col fa fa-fast-backward fa-2x" onClick = {() =>{
                            let type = MovieStore.request_type.split(' ')
                            if(pageNum !== 1){
                                if(type[0] === "getPopularGenre"){
                                    MovieStore.get_popular_genre(type[1])
                                    setPageNum(1);
                                }
                                else if(type[0] === "getPopular"){
                                    MovieStore.get_popular()
                                    setPageNum(1);
                                }
                                else if(type[0] === "queryMovies"){
                                    MovieStore.query_movies(type[1]);
                                    setPageNum(1);
                                }
                            }
                            else{
                                window.alert("you are at the first page!")
                            }
                            }}></i>
                    {/*on step backwards' icon's click; based on the last request type it will take that request and return the previous page */}
                    <i className = "col fa fa-step-backward fa-2x" onClick = {() =>{
                            let type = MovieStore.request_type.split(' ')
                            if(pageNum !== 1){
                                if(type[0] === "getPopularGenre"){
                                    MovieStore.get_popular_genre(type[1], pageNum -1)
                                    setPageNum(pageNum-1);
                                }
                                else if(type[0] === "getPopular"){
                                    MovieStore.get_popular(pageNum - 1)
                                    setPageNum(pageNum - 1);
                                }
                                else if(type[0] === "queryMovies"){
                                    MovieStore.query_movies(type[1], pageNum-1);
                                    setPageNum(pageNum -1);
                                }
                            }
                            else{
                                window.alert("you are at the first page!")
                            }
                            }}></i>
                    {/*display current page number */}
                    <p>{pageNum}</p>
                        {/*on step forward's icon's click; based on the last request type it will take that request and return the next page up if it is not already at the last page */}
                        <i className = "col fa fa-step-forward fa-2x" onClick = {() =>{
                            let type = MovieStore.request_type.split(' ')
                            if(pageNum !== MovieStore.max_pages){
                                if(type[0] === "getPopularGenre"){
                                    MovieStore.get_popular_genre(type[1], pageNum +1)
                                    setPageNum(pageNum+1);
                                }
                                else if(type[0] === "getPopular"){
                                    MovieStore.get_popular(pageNum+1)
                                    setPageNum(pageNum +1);
                                }
                                else if(type[0] === "queryMovies"){
                                    MovieStore.query_movies(type[1], pageNum+1);
                                    setPageNum(pageNum +1);
                                }
                            }
                            else{
                                window.alert("you are on the last page");
                            }
                            
                        }}></i>
                        {/*on fast forward's icon's click; based on the last request type it will take that request and return the last page(max_pages count in request) up if it is not already at the last page */}
                        <i className = "col fa fa-fast-forward fa-2x" onClick = {() =>{
                            let type = MovieStore.request_type.split(' ')
                            if(pageNum !== MovieStore.max_pages){
                                if(type[0] === "getPopularGenre"){
                                    MovieStore.get_popular_genre(type[1], MovieStore.max_pages)
                                    setPageNum(MovieStore.max_pages);
                                }
                                else if(type[0] === "getPopular"){
                                    MovieStore.get_popular(MovieStore.max_pages)
                                    setPageNum(MovieStore.max_pages);
                                }
                                else if(type[0] === "queryMovies"){
                                    MovieStore.query_movies(type[1], MovieStore.max_pages);
                                    setPageNum(MovieStore.max_pages);
                                }
                            }
                            else{
                                window.alert("you are on the last page");
                            }
                            }}></i>

                    </div>
            </div>
        </div>
        </div>
    ));

} export default MovieSearch