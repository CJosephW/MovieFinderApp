import React from "react";
import MovieItem from "./MovieItem";
import { useObserver } from 'mobx-react';
import { MovieStore } from "../stores/MovieStore";
import "../style/MovieSearch.scss";
import MovieModal from "./MovieModal";
import {ModalStore} from "../stores/ModalStore";

function PageNavigator(props){

    return  useObserver(() =>(
        
        <div class = "page-navigator">
        {/*on fastbackward icon's click; based on the last request type it will take that request and return to the first page, if it is not already */}
        <i className = "col fa fa-fast-backward fa-2x" onClick = {() =>{
                let type = MovieStore.request_data.type
                if(MovieStore.request_data.page !== 1){
                    if(type === "getPopularGenre"){
                        MovieStore.get_popular_genre(MovieStore.request_data.genre_string)
                    }
                    else if(type === "getPopular"){
                        MovieStore.get_popular()
                    }
                    else if(type === "queryMovies"){
                        MovieStore.query_movies(MovieStore.request_data.query);
                    }
                }
                else{
                    window.alert("you are at the first page!")
                }
                }}></i>
        {/*on step backwards' icon's click; based on the last request type it will take that request and return the previous page */}
        <i className = "col fa fa-step-backward fa-2x" onClick = {() =>{
                let type = MovieStore.request_data.type
                if(MovieStore.request_data.page !== 1){
                    if(type === "getPopularGenre"){
                        MovieStore.get_popular_genre(MovieStore.request_data.genre_string, MovieStore.request_data.page -1)
                    }
                    else if(type === "getPopular"){
                        MovieStore.get_popular(MovieStore.request_data.page - 1)
                    }
                    else if(type === "queryMovies"){
                        MovieStore.query_movies(MovieStore.request_data.query, MovieStore.request_data.page-1);
                    }
                }
                else{
                    window.alert("you are at the first page!")
                }
                }}></i>
        {/*display current page number */}
        <p>{MovieStore.request_data.page}</p>
            {/*on step forward's icon's click; based on the last request type it will take that request and return the next page up if it is not already at the last page */}
            <i className = "col fa fa-step-forward fa-2x" onClick = {() =>{
                let type = MovieStore.request_data.type
                if(MovieStore.request_data.page !== MovieStore.request_data.max_pages){
                    if(type === "getPopularGenre"){
                        MovieStore.get_popular_genre(MovieStore.request_data.genre_string, MovieStore.request_data.page +1)
                    }
                    else if(type === "getPopular"){
                        MovieStore.get_popular(MovieStore.request_data.page +1)
                    }
                    else if(type === "queryMovies"){
                        MovieStore.query_movies(MovieStore.request_data.query,MovieStore.request_data.page +1 );
                    }
                }
                else{
                    window.alert("you are on the last page");
                }
                
            }}></i>
            {/*on fast forward's icon's click; based on the last request type it will take that request and return the last page(max_pages count in request) up if it is not already at the last page */}
            <i className = "col fa fa-fast-forward fa-2x" onClick = {() =>{
                let type = MovieStore.request_data.type
                if(MovieStore.request_data.page !== MovieStore.request_data.max_pages){
                    if(type === "getPopularGenre"){
                        MovieStore.get_popular_genre(MovieStore.request_data.genre_string, MovieStore.request_data.max_pages)
                    }
                    else if(type === "getPopular"){
                        MovieStore.get_popular(MovieStore.request_data.max_pages)
                    }
                    else if(type === "queryMovies"){
                        MovieStore.query_movies(MovieStore.request_data.query, MovieStore.request_data.max_pages);
                    }
                }
                else{
                    window.alert("you are on the last page");
                }
                }}></i>

        </div>
    ))
} export default PageNavigator
