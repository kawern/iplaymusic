import './App.css';
import { Router } from '@reach/router'
import Featured from './components/Featured'
import Albums from './components/Albums'
import AlbumDetails from './components/AlbumDetails'
import Categories from './components/Categories'
import Playlists from './components/Playlists'
import Player from './components/Player'
import TokenContextProvider from './contexts/TokenContext';
import AuthContextProvider from './contexts/AuthContext';
import Login from './views/Login';
import Callback from './views/Callback';


function App() {
  return (
    <AuthContextProvider>
    <TokenContextProvider>
      <Router>
        <Login path="/"/>
        <Featured path="featured"/>
        <Callback path="callback"/>
        <Albums path="albums"/>
        <AlbumDetails path="/albums/details"/>
        <Categories path="/categories"/>
        <Playlists path="/playlists"/>
        <Player path="/player"/>

      </Router>
    </TokenContextProvider>
    </AuthContextProvider>
  );
}

export default App;
