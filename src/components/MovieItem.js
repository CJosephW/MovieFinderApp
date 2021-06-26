import React from "react";
import { useState } from "react";
import '../style/MovieItem.scss';

function MovieItem(props){
    const [showModal, setShowModal] = useState(false);
    return(
        <div class = "col-3">
            <p class = "movie-title">{props.title}</p>
            {showModal?<p class = "movie-title" onMouseLeave = {() => {
                setShowModal(false);
            }}>{props.overview}</p>
            : <img class = " movie-image img-thumbnail" src = {props.image_link} alt = "missing movie art" onClick={() =>{
                setShowModal(true)
            }}></img>
            }
        </div>
    );
}export default MovieItem;