import React from "react";
import {useState, useEffect} from 'react';
import GetMovies from "../utils/GetMovies";


function MovieSearch(props){
    return(
        <div>
            <div class = "search_bar container">
                <div class = "input-group rounded">
                    <input type = "search" class = "form-control rounded" placeholder = "Search Movies" aria-label = "Search Movies"/>
                    <span class = "input-group-text border-0" id= "search-addon">
                        <i className = "fa fa-search" onClick = {GetMovies}></i>
                        
                    </span>
                </div>
            </div>

            <p>movie search container here</p>
        </div>
        
    );

} export default MovieSearch