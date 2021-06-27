import React from "react";
import '../style/MovieItem.scss';

function MovieItem(props){
    return(
        <div class = "col-3">
            <p class = "movie-title">{props.title}</p>
            <img class = " movie-image img-thumbnail" src = {props.image_link} alt = "missing movie art" onClick={props.onClick}></img>
            <i class = "fa fa-plus-square fa-2x" onClick = {props.addOnClick}></i>
        </div>
    );
}export default MovieItem;