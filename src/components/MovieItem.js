import React from "react";
import '../style/MovieItem.scss';
import {useState, useEffect,} from "react";
import { useObserver } from "mobx-react";
import{WatchListStore} from "../stores/WatchListStore";


function MovieItem (props){

    const [inList, setInList] = useState(false);

    useEffect(() => {
            //check local storage for wish list item
            if(WatchListStore.movies.length === 0){
                WatchListStore.checkLocal();  
            }
            //if movie id exists in watch list store set the inList state to true
            if(WatchListStore.movies.some(item => item.id === props.id)){
                setInList(true);
            }
    });
    //set in list state to true and add move to WishListStore's movie array
    function addItem(movie){
        setInList(true);
        WatchListStore.addMovie(movie);

    }
    //set in list state to false and remove from WishListStore's movie array
    function removeItem(id){
        WatchListStore.deleteMovie(id);
        setInList(false)
    }

    return useObserver(() => (
        <div class = "col-3">
            <p class = "movie-title">{props.title}</p>
            <img class = " movie-image img-thumbnail" src = {props.image_link} alt = "missing movie art" onError={(e)=>
                {e.target.onerror = null; e.target.src="https://www.picturetopeople.org/images/photo_editor/not_loaded_sample.gif"}}
                onClick={props.onClick}></img>
            {
                inList?
                <i class = "fa fa-minus-square fa-2x" onClick = {() => removeItem(props.id)}/>
                :<i class = "fa fa-plus-square fa-2x" onClick = {() => addItem(props.movie)}></i>
            }
            
        </div>
    ))

} export default MovieItem;