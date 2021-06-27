import React from "react";
import { useState } from "react";
import '../style/MovieItem.scss';
import MovieModal from "./MovieModal"
function MovieItem(props){
    const [showModal, setShowModal] = useState(false);
    return(
        <div class = "col-3">
            <p class = "movie-title">{props.title}</p>
            <img class = " movie-image img-thumbnail" src = {props.image_link} alt = "missing movie art" onClick={props.onClick}></img>

        </div>
    );
}export default MovieItem;