import React from "react";
import "../style/MovieModal.scss"

function MovieModal(props){
    
    return(
        <div class = " movie-modal  container-fluid">
            <p class = "movie-title">{props.title}</p>
            <img class = " imageo img-thumbnail"src = {props.image_link} alt = "missing movie art"></img>
            <p>{props.overview}</p>
            <p>Average Rating: {props.vote_average}/10 <i className = "fa fa-star"></i> ({props.vote_count} ratings)</p>
            <p class = "less-button align-text-bottom" onClick = {props.onClick}>Less</p>
        </div>
    );
} export default MovieModal