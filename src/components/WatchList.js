import React from "react";
import { WatchListStore } from '../stores/WatchListStore';
import {useObserver} from "mobx-react";
import WatchListItem from './WatchListItem';
import {useEffect, useState} from "react";

function WatchList(){


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
            {
                checkIfEmpty() ?
                <div class = "movie-rows row">
                    {WatchListStore.movies.map((movie) => {
                    return <WatchListItem movie = {movie} id = {movie.id} title = {movie.title} image_link = {movie.image_link} overview = {movie.overview} onClick = {() => {
                        //possibly implement modal here
                    }}/>
                    })}
                </div> 
                :
                <p>your watch list is empty, add some movies by clicking on the plus icon!</p>
            }
            
        </div>
    
    


    ));

} export default WatchList;