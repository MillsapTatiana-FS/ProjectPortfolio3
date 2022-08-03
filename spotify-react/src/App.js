import { useEffect, useState} from "react";
import './App.css';

function App() {
  const CLIENT_ID = "d6f9ca3d9254465c9820c56c43246f1e"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  return (
    <div className="App">
      <header className="App-header">
       <h1>Spotify React</h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
      </header>
    </div>
  );
}

export default App;
