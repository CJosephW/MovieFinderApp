import React from "react";
import '../style/WatchListMovieItem.scss';
import {useState, useEffect,} from "react";
import { useObserver } from "mobx-react";
import{WatchListStore} from "../stores/WatchListStore";


function WatchListItem (props){

    const [inList, setInList] = useState(false);

    useEffect(() => {
            if(WatchListStore.movies.some(item => item.id === props.id)){
                setInList(true);
            }
    });

    function addItem(movie){
        setInList(true);
        WatchListStore.addMovie(movie);

    }

    function removeItem(id){
        WatchListStore.deleteMovie(id);
        setInList(false)
    }

    return useObserver(() => (
        <div class = "col-4">
            <h1 class = "movie-title">{props.title}</h1>
            <img class = "movie-image  img-thumbnail" src = {props.image_link} alt = "missing movie art" onClick={props.onClick} onError={(e)=>
                {e.target.onerror = null; e.target.src="https://www.picturetopeople.org/images/photo_editor/not_loaded_sample.gif"}}></img>
            <p class = "overview">{props.overview}</p>
            {
                inList?
                <i class = "fa fa-minus-square fa-2x" onClick = {() => removeItem(props.id)}/>
                :<i class = "fa fa-plus-square fa-2x" onClick = {() => addItem(props.movie)}></i>
            }
            
        </div>
    ))

} export default WatchListItem;