import React from "react";
import { WatchListStore } from '../stores/WatchListStore';
import {useObserver} from "mobx-react";
import WatchListItem from './WatchListItem';
import {useEffect, useState} from "react";
import {ModalStore} from "../stores/ModalStore";
import MovieModal from "./MovieModal";
import "../style/WatchList.scss"
function WatchList(){

    const [showModal, setShowModal] = useState(false)

    function displayModal(){
        
        return(
            <MovieModal title = {ModalStore.movie.title} overview = {ModalStore.movie.overview} image_link = {ModalStore.movie.image_link} vote_average = {ModalStore.movie.vote_average} vote_count = {ModalStore.movie.vote_count} onClick = {()=>{
                //on button click set ModalStore's movie to none and set the ShowModal state to false so it doesn't display any longer
                ModalStore.movie = {};
                setShowModal(false)}}></MovieModal>
        );
    }

    useEffect(() => {
        //if the watch list store's movie is length on mount, check that there is no movies in local storage
        if(WatchListStore.movies.length === 0){
            WatchListStore.checkLocal();  
        }
        //if show modal is true scroll to modal's position, which is the top of the page
        if(showModal ===true){
            window.scrollTo(0,0)
        }   
    })
    //check WatchListStore's movie array for movies
    const checkIfEmpty = () => {
        if(WatchListStore.movies.length !== 0){
            return true;
        }
        else{
            return false;
        }
    }

    return useObserver (() =>(
        <div class = "container">
            <div class = "modal-container">
             {
                //if a movie is clicked on show Modal is set to true and the MovieModal Component is displayed with the selected movie's data otherwise do not display the modal
                showModal?
                displayModal()
                : null
            }
            </div>
            {
                //if checkIfEmpty returns true return movie arrays
                checkIfEmpty() ?
                    <div class = "movie-rows row">
                        {WatchListStore.movies.map((movie) => {
                        return <WatchListItem movie = {movie} id = {movie.id} title = {movie.title} image_link = {movie.image_link} overview = {movie.overview} onClick = {() => {
                            ModalStore.movie = movie;
                            setShowModal(true)
                        }}/>
                        })}
                    </div> 
                ://otherwise return this paragraph element telling the user to add some movies
                    <p>your watch list is empty, add some movies by clicking on the plus icon!</p>
            }
        </div>
    ));

} export default WatchList;