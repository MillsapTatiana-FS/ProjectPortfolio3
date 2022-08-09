import { useState, useEffect } from "react";

const CLIENT_ID = "d6f9ca3d9254465c9820c56c43246f1e"
const CLIENT_SECRET = "a96119c60e8640ffb3d7a66d2e748a77"

function App() {
  
  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
  })
  // const REDIRECT_URI = "http://localhost:3000"
  // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  // const RESPONSE_TYPE = "token"

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
      </header>
    </div>
  );
}

export default App;
