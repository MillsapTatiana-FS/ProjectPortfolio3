import React from 'react'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=d6f9ca3d9254465c9820c56c43246f1e&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email%20user-library-modify%20user-library-read&show_dialog=true"

export default function Login() {
  return (

    <button>
    <a href={AUTH_URL}>Login with Spotify</a>
    </button>
    
  )
}
