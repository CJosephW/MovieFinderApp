import React from "react";
import { WatchListStore } from '../stores/WatchListStore';
import {useObserver} from "mobx-react";
import WatchListItem from './WatchListItem';


function WatchList(){
    return useObserver (() =>(
        <div class = "container">
            <div class = "movie-rows row">
            {WatchListStore.movies.map((movie) => {
            return <WatchListItem movie = {movie} id = {movie.id} title = {movie.title} image_link = {movie.image_link} overview = {movie.overview} onClick = {() => {
                //possibly implement modal here
              }}/>
              })}
            </div>
          </div>
    
    


    ));

} export default WatchList;