import './style/App.scss'
import MovieSearch from "./components/MovieSearch"
import WatchListItem from './components/WatchListItem';
import {useState} from "react";
import { WatchListStore } from './stores/WatchListStore';
import { observable } from 'mobx';
import {useObserver} from "mobx-react";
import WatchList from "./components/WatchList";


function App() {
  const [showSearch, setShowSearch] = useState(true);

  return useObserver (() =>(
    <div className="App">
      
      {
        showSearch?
        <div>
          <div class = "header">
          <h1>Movie Finder</h1>
          <p onClick = {()=>setShowSearch(false)}>Watch List</p>
          </div>
          <MovieSearch></MovieSearch>
        </div>
        :
        <div>
          <div class = "header">
          <h1>Watch List</h1>
          <p onClick = {()=>setShowSearch(true)}>Movie Finder</p>
          </div>
          <WatchList></WatchList>
        </div>
      }
      
    </div>
  ));
}

export default App;
