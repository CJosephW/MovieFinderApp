import React from "react";
import '../style/MovieItem.scss';
import {useState, useEffect,} from "react";
import { useObserver } from "mobx-react";
import{WatchListStore} from "../stores/WatchListStore";


function MovieItem (props){

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
        <div class = "col-3">
            <p class = "movie-title">{props.title}</p>
            <img class = " movie-image img-thumbnail" src = {props.image_link} alt = "missing movie art" onClick={props.onClick}></img>
            {
                inList?
                <i class = "fa fa-minus-square fa-2x" onClick = {() => removeItem(props.id)}/>
                :<i class = "fa fa-plus-square fa-2x" onClick = {() => addItem(props.movie)}></i>
            }
            
        </div>
    ))

} export default MovieItem;