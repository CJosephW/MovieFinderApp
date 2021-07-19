import { useObserver } from "mobx-react";
import { MovieStore } from "../stores/MovieStore";
import React from "react";

function GenreRow(){
    return useObserver (()=>(
        
        <div class = "genre-row row">
            <p class = "col" onClick = {()=>{
                MovieStore.get_popular_genre("37");
            }}>Western</p>
            <p class = "col"onClick = {()=>{
                MovieStore.get_popular_genre("80");
            }}>Crime</p>
            <p class = "col"onClick = {()=>{
                MovieStore.get_popular_genre("10752");
            }}>History</p>
            <p class = "col"onClick = {()=>{
                MovieStore.get_popular_genre("36");
            }}>Action</p>
            <p class = "col"onClick = {()=>{
                MovieStore.get_popular_genre("12");
            }}>Adventure</p>
            <p class = "col"onClick = {()=>{
                MovieStore.get_popular_genre("16");
            }}>Animation</p>
            <p class = "col"onClick = {()=>{
                MovieStore.get_popular_genre("99");
            }}>Documentary</p>
            <p class = "col"onClick = {()=>{
                MovieStore.get_popular_genre("18");
            }}>Drama</p>
            <p class = "col"onClick = {()=>{
                MovieStore.get_popular_genre("27");
            }}>Horror</p>
            <p class = "col"onClick = {()=>{
                MovieStore.get_popular_genre("878");
            }}>Science Fiction</p>
        </div>
    ));
} export default GenreRow