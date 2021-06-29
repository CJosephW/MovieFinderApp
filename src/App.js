import './style/App.scss'
import MovieSearch from "./components/MovieSearch"
import WatchListItem from './components/WatchListItem';
import {useState} from "react";
import { WatchListStore } from './stores/WatchListStore';
import { observable } from 'mobx';
import {useObserver} from "mobx-react";


function App() {
  const [showSearch, setShowSearch] = useState(true);

  return useObserver (() =>(
    <div className="App">
      {
        showSearch?
        <div>
        <h1 onClick = {()=>setShowSearch(false)}>Movie Finder</h1>
        <MovieSearch></MovieSearch>
        </div>
        : 
          <div class = "container">
            <h1 onClick = {()=>setShowSearch(true)}>Watch List</h1>
            <div class = "movie-rows row">
            {WatchListStore.movies.map((movie) => {
            return <WatchListItem movie = {movie} id = {movie.id} title = {movie.title} image_link = {movie.image_link} overview = {movie.overview} onClick = {() => {
              }}/>
              })}
            </div>
          </div>

      }
      
    </div>
  ));
}

export default App;
