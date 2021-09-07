import './App.scss';
import { Router } from '@reach/router'
import Featured from './components/Featured'
import Albums from './components/Albums'
import Album from './components/Album'
import Categories from './components/Categories'
import Playlists from './components/Playlists'
import Player from './components/Player'
import TokenContextProvider from './contexts/TokenContext';
import AuthContextProvider from './contexts/AuthContext';
import Login from './views/Login';
import Callback from './views/Callback';
import Playlist from './components/Playlist';
import Test from './components/Test';


function App() {
  return (<div className="wrapper">
    
    <AuthContextProvider>
    <TokenContextProvider>
      <Router>
      <Login path="/"/>
        <Featured path="featured"/>
        <Callback path="callback"/>
        <Albums path="/albums"/>
        <Album path="/album/:id"/>
        <Categories path="/categories"/>
        <Playlists path="/playlists"/>
        <Playlist path="/playlist/:id"/>
        <Player path="/player/:id"/>
        <Test path="/test/:id"/>


      </Router>
    </TokenContextProvider>
    </AuthContextProvider>
    </div>
  );
}

export default App;
