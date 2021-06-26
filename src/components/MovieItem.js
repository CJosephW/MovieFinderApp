import React from "react";

function MovieItem(props){

    return(
        <div class = "col">
            <h3>{props.title}</h3>
            <img src = {props.image_link} alt = "missing movie art"></img>
            <p>Overview: {props.overview}</p>
        </div>
    );
}export default MovieItem;